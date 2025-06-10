"use client"

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function redirect(){
    const params = useParams()
    const shortId = params.shortid

    useEffect(()=>{
        loadOriginalUrl()
    },[])

   async function loadOriginalUrl(){
        const response = await axios.get(`http://localhost:3333/shorten?identifier=${shortId}`)
        const originalUrl = response.data.originalUrl

        window.location.href = originalUrl
    }
    
   return <h1>Redirecionamento - {shortId}</h1>
}
  