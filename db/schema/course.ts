import { relations, sql } from "drizzle-orm"
import { int } from "drizzle-orm/mysql-core"
import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    PgTable,
    pgEnum,
    serial,
    boolean
} from "drizzle-orm/pg-core"
import { realpathSync } from "fs"
import { users } from "./user"
import notion from "next-auth/providers/notion"
import { Inter_Tight } from "next/font/google"



// course <-> user , yet to create
export const course = pgTable("course", {
    id: serial("id").notNull().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    thumbnail: text("thumbnail").notNull(),
    price: integer("price").notNull(),
    creatorId: integer("creatorId").notNull().references(() => users.id, { onDelete: "cascade" })
})



export const chapter = pgTable("chapter", {
    id: serial("id").notNull().primaryKey(),
    isPublished: boolean("isPublished").default(false),
    isPublic: boolean("isPublic").default(false),
    description: text("description").notNull(),
    videoUrl: text("videoUrl").notNull(),
    title: text("title").notNull(),
    courseId: integer("courseId").notNull().references(() => course.creatorId, { onDelete: "cascade" })
})







export const contentType = pgEnum("contentType", ["video", "notes"])



export const content = pgTable("content", {
    id: serial("id").notNull().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    contentType: contentType('contentType'),
    courseId: integer("courseId").references(() => course.id, { onDelete: "cascade" }),
    segmentId: integer("segmentId").references(() => segment.id, { onDelete: "cascade" })
})


export const userRelationCourse = pgTable("userRelationCourse", {
    courseId: integer("courseId").notNull().references(() => course.id, { onDelete: "cascade" }),
    userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
}
    ,
    (table) => ({
        pk: primaryKey(table.courseId, table.userId)
    })
)



export const segment = pgTable("segment", {
    id: serial("id").notNull().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("courseId").references(() => course.id, { onDelete: "cascade" })
})



// yet to add one 
export const videoMetadata = pgTable("videoMetadata", {
    id: serial("id").notNull().primaryKey(),
    url: text("url").notNull(),
    size: integer("size").notNull(),
    uploadedOn: timestamp("uploadedOn").default(sql`CURRENT_TIMESTAMP`),
    contentId: integer("contentId").references(() => content.id, { onDelete: "cascade" })
})


// yet to add 
export const notionMetadata = pgTable("notionMetadata", {
    id: serial("id").notNull().primaryKey(),
    url: text("url").notNull(),
    size: integer("size").notNull(),
    uploadedOn: timestamp("uploadedOn").default(sql`CURRENT_TIMESTAMP`),
    contentId: integer("contentId").references(() => content.id, { onDelete: "cascade" })
})



// one segment -> many content
export const segmentContent = relations(segment, ({ many, one }) => ({
    content: many(content),
    course: one(course, {
        fields: [segment.courseId],
        references: [course.id]
    })
}))



// one course -> many segment
// one course -> many content 
// one course -> many users 
export const courseSegments = relations(course, ({ many, one }) => ({
    segment: many(segment),
    videos: many(content),
    users: many(userRelationCourse),
    creator: one(users, {
        fields: [course.creatorId],
        references: [users.id]
    })
}))


export const videoMetadataRelation = relations(videoMetadata, ({ one }) => ({

    course: one(content, {
        fields: [videoMetadata.contentId],
        references: [content.id]
    })

}))






// content - metadata 
// content - notionMetadata 
export const contentVideo = relations(content, ({ one }) => ({
    videoMetadata: one(videoMetadata),
    notionMetadata: one(notionMetadata),
    course: one(course, {
        fields: [content.courseId],
        references: [course.id]
    })
    ,
    segment: one(segment, {
        fields: [content.segmentId],
        references: [segment.id]
    })
}));



// many user <--> many course
export const userManyuserCourse = relations(users, ({ many }) => ({
    courses: many(userRelationCourse)
}))


export const notionMetaDataRelation = relations(notionMetadata, ({ one }) => ({
    course: one(content, {
        fields: [notionMetadata.contentId],
        references: [content.id]
    })
    ,
}));



// userRelationCouse -> course
// userRelationCouse -> user
export const usersToGroupsRelations = relations(userRelationCourse, ({ one }) => ({
    course: one(users, {
        fields: [userRelationCourse.userId],
        references: [users.id],
    }),
    user: one(course, {
        fields: [userRelationCourse.courseId],
        references: [course.id],
    }),
}));