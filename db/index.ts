import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const URL = process.env.DATABASE_URL || ""

const queryClient = postgres(URL);

export const db = drizzle(queryClient);