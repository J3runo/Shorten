import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { shortenservice } from "../Services/ShortenService";
import { request } from "http";

export async function shortenController(app:FastifyInstance) {
    app.post("/shorten", async (request:FastifyRequest, replay:FastifyReply)=>{
        try{
            const body = request.body as {url:string,shortId:string | null}
            const identifier = await shortenservice.register(body)
            return identifier
        }catch(error:any){
            return replay.status(404).send({error:"not Found"})
        }
    })

    app.get("/shorten", async (request:FastifyRequest, replay:FastifyReply)=>{
        try{
            const query = request.query as {identifier:string}
            const url = await shortenservice.findbyIdentifier(query.identifier)
            return url;
        }catch(error:any){
            return replay.status(404).send({error:"not Found"})
        }
    })

    app.post("/qr-code",async (request:FastifyRequest, replay:FastifyReply)=>{
        try{
            const body = request.body as {url:string}
            const base64 = await shortenservice.generateQrCode(body)
            return base64
        }catch(error:any){
            return replay.status(404).send({error:"not Found"})
        }
    })
    
}   