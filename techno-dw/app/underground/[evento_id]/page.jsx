
import { getEventoBySlug } from "@/lib/cosmic"
import PaginaReceberEvento from "./pagina-receber-evento"


export default async function Page({ params }) {
  const evento = await getEventoBySlug(parseInt(params.evento_id) + 1)

  return <PaginaReceberEvento evento={evento}/>
}