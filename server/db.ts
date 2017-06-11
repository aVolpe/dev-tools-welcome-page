import {IMain, IDatabase} from 'pg-promise';
import pgPromise = require('pg-promise');
const pgp = require('pg-promise')(/*options*/)


const fullConfig = require('../../server/database.json');

const env = process.env.DB_ENV || 'dev';

const dbConfig = fullConfig[env];

const connString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:5432/${dbConfig.database}`;

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
