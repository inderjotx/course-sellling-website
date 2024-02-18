CREATE TABLE IF NOT EXISTS "purchases" (
	"courseId" integer NOT NULL,
	"userId" text NOT NULL,
	"boughtOn" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "purchases_courseId_userId_pk" PRIMARY KEY("courseId","userId")
);
--> statement-breakpoint
DROP TABLE "userRelationCourse";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchases" ADD CONSTRAINT "purchases_courseId_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchases" ADD CONSTRAINT "purchases_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
