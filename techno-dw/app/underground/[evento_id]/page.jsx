import { getAllEventos } from "@/lib/cosmic"
import PaginaReceberId from "./pagina-receber-id"

export default async function Page() {

  const allEventos = await getAllEventos()

  return <PaginaReceberId allEventos={allEventos}/>
}