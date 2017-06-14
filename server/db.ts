import {IMain, IDatabase} from 'pg-promise';
import pgPromise = require('pg-promise');
const pgp = require('pg-promise')(/*options*/)


const fullConfig = require.main.require('../database.json');

const env = process.env.DB_ENV || 'dev';


const dbConfig = fullConfig[env];
let user = dbConfig.user;
let pass = dbConfig.password;

if (typeof user === 'object') {
    user = process.env[user.ENV];
}

if (typeof pass === 'object') {
    pass = process.env[pass.ENV];
}

const connString = `postgres://${user}:${pass}@${dbConfig.host}:5432/${dbConfig.database}`;

class DBConn {

    public conn: pgPromise.IDatabase<any>;
    public defaultSchema: string;

    constructor() {
        this.conn = pgp(connString);
        this.defaultSchema = dbConfig.schema;

    }
};

const db = new DBConn();

export { db };
