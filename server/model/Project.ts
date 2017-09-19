import {IsNotEmpty, validate} from 'class-validator';
import {db} from '../db';
import {plainToClass} from 'class-transformer';

export class UserProject {


    public static OWNER = 'OWNER';
    public static MANAGER = 'MANAGER';
    public static MEMBER = 'MEMBER';
    public static REPORTER = 'REPORTER';

    constructor(
        public user_id: number,
        public project_id: number,
        public role: string
    ) {}

    public add(): Promise<UserProject> {
        return null;
        // return db.conn.none('' +
        //     'INSERT INTO user_project (user_id, project_id, role)' +
        //     'VALUES(${user_id}, ${project_id}, ${role})', this)
        //     .then(() => return this);
    }
}


export class Project {

    public id: number;

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public description: string;

    constructor(id : number, name : string, description: string) {
        this.id = id;
        this.name = name;
    }

    public static getAll(user: number) : Promise<ProjectWithRole[]> {

        console.log('querying');
        return db.conn.any('' +
            'SELECT p.*, up.role ' +
            'FROM project p ' +
            'JOIN user_project up ON up.project_id = p.id ' +
            'WHERE up.user_id = ${user}', { user : user })
            .then(data => {
            return plainToClass(ProjectWithRole, data);
        });
    }

    public add(user: number): Promise<ProjectWithRole> {

        return validate(this, { validationError: { target: false } })
            .then(errors => {
                if (errors.length > 0) {
                    throw errors;
                }
                return this;
            }).then(project => {
                console.log('creating');
                return db.conn.one('' +
                    'INSERT INTO project (name, description) ' +
                    'VALUES(${name}, ${description})' +
                    'RETURNING id', project)
                    .then((id) => {
                        console.log('now role');
                        project.id = id;
                        return new UserProject(user, id, UserProject.OWNER)
                            .add()
                            .then(up => {
                                return new ProjectWithRole(project, up.role);
                            });
                    });
            }).catch(error => {
                console.log(error);
                throw error;
            });
    }

}

export class ProjectWithRole extends Project {
    constructor(
        project: Project,
        public role
    ) { super(project.id, project.name, project.description); }
};
