import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as userSchema from "@/db/schema/user"
import * as courseSchema from "@/db/schema/course"
import { users } from '@/db/schema/user';
import { course, chapter } from '@/db/schema/course';


const URL = process.env.DATABASE_URL || ""

const queryClient = postgres(URL);

export const db = drizzle(queryClient, { schema: { ...userSchema, ...courseSchema } });

export type User = typeof users.$inferSelect
export type Course = typeof course.$inferSelect
export type Chapter = typeof chapter.$inferSelect
