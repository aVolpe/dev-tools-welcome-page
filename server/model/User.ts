import * as bcrypt from 'bcrypt';
import {IsEmail, IsNotEmpty, Length, validate} from 'class-validator';
import {db} from '../db';
import {plainToClass} from 'class-transformer';

export class User {

    public id: string;

    @IsNotEmpty()
    public name: string;

    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @Length(6)
    public password: string;

    public salt: string;


    constructor() {
    }

    public static getAll() : Promise<User[]> {

        return db.conn.many('SELECT * FROM "user"').then(data => {
            return plainToClass(User, data);
        }).then(users => {
            users.forEach(User.filterProp)
            return users;
        });
    }

    public add(): Promise<User> {

        return validate(this, { validationError: { target: false } })
            .then(errors => {
                if (errors.length > 0) {
                    throw errors;
                }
                return this;
            }).then(user => {

                const cryptData = User.buildData(this);
                user.password = cryptData.pass;
                user.salt = cryptData.salt;
                return user;
            }).then(user => {

                return db.conn.none('' +
                    'INSERT INTO "user"(name, email, password, salt) ' +
                    'VALUES(${name}, ${email}, ${password}, ${salt})', user)
                    .then(() => {
                        return User.filterProp(user);
                    })
            }).catch(error => {
                if (error.code = "23505") {
                    throw [
                        {
                            "property": "email",
                            "constraints": {
                                "unique": "the email is in use"
                            }
                        }
                    ]
                }
                throw error;
            });
    }

    public static login(user: string, pass: string): Promise<User> {
        const errorMessage = {
                        code : 404,
                        message : "Wrong user/pass combination"
                    };
        if (!user || !pass)
            return Promise.reject(errorMessage);

        return db.conn.one('' +
            ' SELECT ' +
            '   * ' +
            ' FROM "user"' +
            ' WHERE email = ${email}' +
            ' LIMIT 1', { email : user })
            .then(data => {
                console.log(data);
                if (User.validate(data, pass)) {
                    return User.filterProp(data);
                }
                throw errorMessage;
            })
            .catch(error => {
                console.log(error);
                if (error.message == "No data returned from the query.") {
                    throw errorMessage;
                }
                throw error;
            });
    }

    private static filterProp(user: User) : User {
        user.password = undefined;
        user.salt = undefined;
        return user;
    }
    
    public static validate(user: User, pass: string): boolean {
        return bcrypt.compareSync(pass, user.password);
    }

    public static buildData(user: User): {salt: string, pass: string} {

        const salt = bcrypt.genSaltSync(10);

        return {
            salt: salt,
            pass: bcrypt.hashSync(user.password, salt)
        }
    }
}