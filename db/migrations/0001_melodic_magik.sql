DO $$ BEGIN
 CREATE TYPE "contentType" AS ENUM('video', 'notes');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"contentType" "contentType",
	"courseId" integer,
	"segmentId " integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"thumbnail" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notionMetadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" integer NOT NULL,
	"uploadedOn" timestamp DEFAULT CURRENT_TIMESTAMP,
	"contentId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "segment" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"courseId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userRelationCourse" (
	"courseId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "userRelationCourse_courseId_userId_pk" PRIMARY KEY("courseId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "videoMetadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"size" integer NOT NULL,
	"uploadedOn" timestamp DEFAULT CURRENT_TIMESTAMP,
	"contentId" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content" ADD CONSTRAINT "content_courseId_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content" ADD CONSTRAINT "content_segmentId _segment_id_fk" FOREIGN KEY ("segmentId ") REFERENCES "segment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notionMetadata" ADD CONSTRAINT "notionMetadata_contentId_content_id_fk" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "segment" ADD CONSTRAINT "segment_courseId_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRelationCourse" ADD CONSTRAINT "userRelationCourse_courseId_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRelationCourse" ADD CONSTRAINT "userRelationCourse_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "videoMetadata" ADD CONSTRAINT "videoMetadata_contentId_content_id_fk" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
