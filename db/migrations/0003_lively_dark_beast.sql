ALTER TABLE "content" RENAME COLUMN "segmentId " TO "segmentId";--> statement-breakpoint
ALTER TABLE "content" DROP CONSTRAINT "content_segmentId _segment_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content" ADD CONSTRAINT "content_segmentId_segment_id_fk" FOREIGN KEY ("segmentId") REFERENCES "segment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
