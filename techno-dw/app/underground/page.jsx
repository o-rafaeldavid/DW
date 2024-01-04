import { getAllEventos, getEventosForUnderground } from "@/lib/cosmic"
import UndergroundContainer_1 from "./components/containers/1/container_1"
import UndergroundContainer_2 from "./components/containers/2/container_2"


export default async function Underground({searchParams}) {
  const allEventos = await getAllEventos()
  const page = parseInt(searchParams.page)
  let pagina = 0

  if(isNaN(page) || page < 0) pagina = 0
  else pagina = page

  const eventosForUnderground = await getEventosForUnderground('created_at', 4, 4 * pagina)

  console.log('mega teste')

  return (
    <>
      <UndergroundContainer_1 data={allEventos}/>
      <UndergroundContainer_2 data={
        (eventosForUnderground !== undefined) ? eventosForUnderground
        : await getEventosForUnderground('created_at', 4, 0)
      }/>
    </>
  )
}
