import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { shortenservice } from "../Services/ShortenService";

export async function shortenController(app:FastifyInstance) {
    app.post("/shorten", async (request:FastifyRequest, replay:FastifyReply)=>{
        try{
            const body = request.body as {url:string}
            const identifier = await shortenservice.register(body.url)
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
    
}   