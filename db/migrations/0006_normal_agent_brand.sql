ALTER TABLE "chapter" ADD COLUMN "order" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "isPublishted" boolean DEFAULT false NOT NULL;