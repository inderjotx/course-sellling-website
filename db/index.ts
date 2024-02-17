import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { Sql } from 'postgres';
import * as userSchema from "@/db/schema/user"
import * as courseSchema from "@/db/schema/course"
import { users } from '@/db/schema/user';
import { course, chapter } from '@/db/schema/course';


const URL = process.env.DATABASE_URL || ""


declare global {
    var queryClient: Sql<{}> | null
}

function getClient() {
    return postgres(URL)
}



export const db = drizzle(globalThis.queryClient || getClient(), { schema: { ...userSchema, ...courseSchema } });


if (!globalThis.queryClient && process.env.NODE_ENV !== "production") globalThis.queryClient = postgres(URL)


export type User = typeof users.$inferSelect
export type Course = typeof course.$inferSelect
export type Chapter = typeof chapter.$inferSelect
