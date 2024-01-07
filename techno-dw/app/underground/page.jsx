import { getAllEventos, getEventosForUnderground } from "@/lib/cosmic"
import UndergroundContainer_1 from "./components/containers/1/container_1"
import UndergroundContainer_2 from "./components/containers/2/container_2"


export default async function Underground({searchParams}) {
  const allEventos = await getAllEventos()
  let page = parseInt(searchParams.page)
  let limit = parseInt(searchParams.limit)


  if(isNaN(page) || page < 0) page = 0
  if(isNaN(limit) || limit < 4) limit = 4

  const eventosForUnderground = await getEventosForUnderground('created_at', limit, limit * page)


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
