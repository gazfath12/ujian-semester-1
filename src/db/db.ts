
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres.hmzefbhgxytxbliiropb',
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    database: 'postgres',
    password: 'ppqitasandbox123',
    port:6543,
});

export default pool;