ALTER TABLE "muxData" ALTER COLUMN "playbackId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "muxData" ADD COLUMN "assetId" text NOT NULL;