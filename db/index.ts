import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { Sql } from 'postgres';
import * as userSchema from "@/db/schema/user"
import * as courseSchema from "@/db/schema/course"
import { users } from '@/db/schema/user';
import { course, chapter } from '@/db/schema/course';


const URL = process.env.DATABASE_URL || ""


let connection: Sql<{}>;

if (process.env.NODE_ENV === 'production') {
    connection = postgres(URL);
} else {
    let globalConnection = global as typeof globalThis & {
        connection: Sql<{}>;
    };

    if (!globalConnection.connection) globalConnection.connection = postgres(URL);

    connection = globalConnection.connection;
}

export const db = drizzle(connection, { schema: { ...userSchema, ...courseSchema } });





export type User = typeof users.$inferSelect
export type Course = typeof course.$inferSelect
export type Chapter = typeof chapter.$inferSelect
