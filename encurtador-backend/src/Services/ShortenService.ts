import { link } from "@prisma/client"
import { prisma } from "../prisma/client"
import { customAlphabet } from "nanoid"
import QrCode from 'qrcode'

class ShortenService{
    public async register({url,shortId}:{url:string, shortId:string | null}){

        const generateNanoId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789", 5)

        const custonId = shortId === null ? generateNanoId() : shortId

        const link = {
            id:crypto.randomUUID(),
            shortId:custonId,
            originalUrl: url,
            createdAt:new Date()
        } as link

        await prisma.link.create({data:link})

        return {shortId:link.shortId}
    }

    public async findbyIdentifier(identifier:string){
        const link = await prisma.link.findUnique({where:{shortId:identifier}})
        if(!link){
            throw new Error("not found")
        }

        return {originalUrl: link.originalUrl}
    }
    public async generateQrCode({url}:{url:string}){
        const base64 = await QrCode.toDataURL(url)
        return {base64:base64}
    }
}

export const shortenservice = new ShortenService()