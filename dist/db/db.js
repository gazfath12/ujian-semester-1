"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres.hmzefbhgxytxbliiropb',
    host: 'aws-0-ap-southeast-1.pooler.supabase.comt',
    database: 'postgres',
    password: 'ppqitasandbox123',
    port: 6543,
});
exports.default = pool;
