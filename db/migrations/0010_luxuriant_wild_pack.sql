ALTER TABLE "chapter" ADD COLUMN "creatorId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chapter" ADD CONSTRAINT "chapter_creatorId_user_id_fk" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
