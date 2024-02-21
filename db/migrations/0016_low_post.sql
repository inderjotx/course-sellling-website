ALTER TABLE "course" RENAME COLUMN "isArchived" TO "isPublic";--> statement-breakpoint
ALTER TABLE "course" ALTER COLUMN "isPublic" DROP NOT NULL;