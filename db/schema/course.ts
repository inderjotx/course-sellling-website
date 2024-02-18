import { relations, sql } from "drizzle-orm"
import {
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
    boolean,
    timestamp
} from "drizzle-orm/pg-core"
import { users } from "./user"
import { timeStamp } from "console"


// course <-> user , yet to create
export const course = pgTable("course", {
    id: serial("id").notNull().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    isPublished: boolean("isPublished").default(false),
    thumbnail: text("thumbnail"),
    price: integer("price"),
    creatorId: text("creatorId").notNull().references(() => users.id, { onDelete: "cascade" }),
    isArchived: boolean("isArchived").notNull().default(false)

})





export const chapter = pgTable("chapter", {
    id: serial("id").notNull().primaryKey(),
    isPublished: boolean("isPublished").default(false),
    isPublic: boolean("isPublic").default(false),
    description: text("description"),
    videoUrl: text("videoUrl"),
    title: text("title").notNull(),
    order: integer("order").notNull(),
    courseId: integer("courseId").notNull().references(() => course.id, { onDelete: "cascade" }),
    creatorId: text("creatorId").notNull().references(() => users.id, { onDelete: "cascade" }),
})


export const muxData = pgTable("muxData", {
    id: serial("id").notNull().primaryKey(),
    chapterId: integer("chapterId").notNull().references(() => chapter.id, { onDelete: "cascade" }),
    playbackId: text("playbackId").notNull(),
    assetId: text("assetId").notNull()
})


export const muxDataChapter = relations(muxData, ({ one }) => ({
    chapter: one(chapter, {
        fields: [muxData.chapterId],
        references: [chapter.id],
    })
}))






export const purchases = pgTable("purchases", {
    courseId: integer("courseId").notNull().references(() => course.id, { onDelete: "cascade" }),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    boughtOn: timestamp("boughtOn").default(sql`CURRENT_TIMESTAMP`)
}
    ,
    (table) => ({
        pk: primaryKey({ columns: [table.courseId, table.userId] })
    })
)



// one course -> many users 
export const courseSegments = relations(course, ({ many, one }) => ({
    chapters: many(chapter),
    users: many(purchases),
    creator: one(users, {
        fields: [course.creatorId],
        references: [users.id],
        relationName: "creator_name"
    })
}))


export const courseRchapter = relations(chapter, ({ one, many }) => ({
    course: one(course, {
        fields: [chapter.courseId],
        references: [course.id]
    })
    ,
    creator: one(users, {
        fields: [chapter.creatorId],
        references: [users.id]
    })
    ,
    muxData: many(muxData)
}))




// many user <--> many course
export const userManyuserCourse = relations(users, ({ many }) => ({
    courses: many(purchases),
    chapters: many(chapter),
}))



// userRelationCouse -> course
// userRelationCouse -> user
export const usersToGroupsRelations = relations(purchases, ({ one }) => ({
    course: one(users, {
        fields: [purchases.userId],
        references: [users.id],
    }),
    user: one(course, {
        fields: [purchases.courseId],
        references: [course.id],
    }),
}));