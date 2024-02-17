'use server'

import { auth } from '@/auth'
import { db } from '@/db'
import { muxData } from '@/db/schema/course'
import Mux from '@mux/mux-node'
import { eq } from 'drizzle-orm'
const MUX_ID = process.env.MUX_TOKEN_ID!
const MUX_SECRET = process.env.MUX_TOKEN_SECRET!


const mux = new Mux({ tokenId: MUX_ID, tokenSecret: MUX_SECRET })


export async function handleUpload(chapterId: number, courseId: number, videoUrl: string) {

    const session = await auth()

    if (!session) {
        return null
    }


    const isAlready = await db.query.muxData.findFirst({
        where(fields, operators) {
            return operators.eq(fields.chapterId, chapterId)
        },
    })


    // if mux data alread for some chapter 
    // delete from mux 
    // delete from database
    if (isAlready) {
        await mux.video.assets.delete(isAlready.assetId)
        await db.delete(muxData).where(eq(muxData.id, isAlready.id))
    }

    // create new at mux and database
    const asset = await mux.video.assets.create({
        input: [{ url: videoUrl }],
        playback_policy: ['public'],
        test: false
    });

    const playbackId = asset.playback_ids![0].id
    const assetId = asset.id
    const createEntry = await db.insert(muxData).values({ playbackId: playbackId, chapterId: chapterId, assetId: assetId })
    return true

}