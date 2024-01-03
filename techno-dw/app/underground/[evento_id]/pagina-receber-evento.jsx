'use client'

import NotFoundPage from "@/app/not-found"
import EventoValidado from "./_paginaValidada"

export default function PaginaReceberEvento({evento}) {
  if(evento !== undefined) return <EventoValidado eventoDados={evento}/>
  else return <NotFoundPage/>
}