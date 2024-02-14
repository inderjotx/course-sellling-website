import type { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db";
import NextAuth from "next-auth";


declare module "next-auth" {
    interface Session {
        user: {
            id: string
        } & DefaultSession['user']
    }
}

const config = {
    providers: [
        Google,
        Github
    ]
    ,
    adapter: DrizzleAdapter(db)
    ,
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id
            return session;
        },

    }


} satisfies NextAuthConfig


export const { handlers, auth, signIn, signOut } = NextAuth(config)