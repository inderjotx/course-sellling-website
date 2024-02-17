import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";



const f = createUploadthing();


export const ourFileRouter = {

    imageUploader: f({ image: { maxFileSize: "4MB" } })

        .middleware(async ({ req }) => {

            const user = await auth();

            if (!user) throw new UploadThingError("Unauthorized");

            return { userId: user.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {

            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);




            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId, fileUrl: file.url };
        }),

    videoUploader: f({ video: { maxFileSize: "64MB" } })

        .middleware(async ({ req }) => {

            const user = await auth();

            if (!user) throw new UploadThingError("Unauthorized");

            return { userId: user.user.id };

        })
        .onUploadComplete(async ({ metadata, file }) => {

            // do mux things 

            //if already vidoe delete mux and id 



            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);




            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId, fileUrl: file.url };
        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;