import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as userSchema from "@/db/schema/user"
import * as courseSchema from "@/db/schema/course"

const URL = process.env.DATABASE_URL || ""

const queryClient = postgres(URL);

export const db = drizzle(queryClient, { schema: { ...userSchema, ...courseSchema } });