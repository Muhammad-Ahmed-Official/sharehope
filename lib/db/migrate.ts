import { migrate } from 'drizzle-orm/neon-http/migrator';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

if(!process.env?.DATABASE_URL) throw new Error("Datebase url missing in enviroment");

async function runMigration() {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const db = drizzle(sql);

        await migrate(db, {migrationsFolder: "./drizzle"});
        console.log("All migrations are successfully done");
    } catch (error) {
        console.log("All migrations are successfully done", error);
        process.exit(1);
    }    
}

runMigration();