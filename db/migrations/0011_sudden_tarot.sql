CREATE TABLE IF NOT EXISTS "muxData" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapterId" integer NOT NULL,
	"playbackId" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "muxData" ADD CONSTRAINT "muxData_chapterId_chapter_id_fk" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
