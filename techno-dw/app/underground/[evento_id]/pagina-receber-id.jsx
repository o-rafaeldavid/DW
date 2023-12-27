'use client'

import NotFoundPage from "@/app/not-found"
import { useParams } from "next/navigation"
import EventoValidado from "./_paginaValidada"

export default function PaginaReceberId({allEventos}) {
  const params = useParams()
  const eventoID = parseInt(params.evento_id)


  if(!isNaN(eventoID)){
    if(eventoID < allEventos.length && eventoID >= 0) return <EventoValidado eventoDados={allEventos[eventoID]}/>
    else return <NotFoundPage/>
  }
  else{
    return <NotFoundPage/>
  }
}