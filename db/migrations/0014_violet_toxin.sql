CREATE TABLE IF NOT EXISTS "progress" (
	"userId" text NOT NULL,
	"chapterId" integer NOT NULL,
	"completedOn" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "progress_userId_chapterId_pk" PRIMARY KEY("userId","chapterId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "progress" ADD CONSTRAINT "progress_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "progress" ADD CONSTRAINT "progress_chapterId_chapter_id_fk" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
