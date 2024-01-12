import { getAllEventos, getEventosForUnderground, getLocalizacoesByDistritoIDs } from "@/lib/cosmic"
import UndergroundContainer_1 from "./components/containers/1/container_1"
import UndergroundContainer_2 from "./components/containers/2/container_2"


export default async function Underground({searchParams}) {
  const allEventos = await getAllEventos()
  let page = parseInt(searchParams.page)
  let limit = parseInt(searchParams.limit)
  let search = searchParams.search
  let date = [searchParams.date1, searchParams.date2]
  let generos = searchParams.generos
  let distritos = searchParams.distritos
  const hoje = new Date().toLocaleDateString("pt", {timeZone: "Portugal"})
                          .split('/').reverse().join('-')

  if(isNaN(page) || page < 0) page = 0
  if(isNaN(limit) || limit < 4) limit = 4



  
  let undefinedDateCounter = 0
  date.forEach(
    (d, index)=> {
      if(d !== undefined){
        d.split('-').forEach(
          (nString) => {
            const numeroData = parseInt(nString)

            if(
              isNaN(numeroData) || 
              numeroData < 1 || 
              numeroData.toString().split('.')[1] !== undefined){
                if(index !== 0){
                  date[index] = undefined
                  undefinedDateCounter++
                } else date[index] = hoje
              }
          }
        )
      }
      else{
        if(index !== 0) undefinedDateCounter++
        else date[index] = hoje
      }
    }
  )

  let generosArray = undefined
  if(generos !== undefined) generosArray = generos.split(',')

  let distritosArray = undefined
  if(distritos !== undefined) distritosArray = distritos.split(',')


  console.log(distritosArray)
  const query = {
    search: search,
    date: (undefinedDateCounter === 2) ? undefined : {
      min: date[0],
      max: date[1]
    },
    generosID: generosArray
  }


  const eventosForUnderground =
  (distritosArray === undefined) ? 
  await getEventosForUnderground("created_at", limit, limit * page, query)
  :
  await getLocalizacoesByDistritoIDs(distritosArray)
    .then(res => {
      let localIDarray = []
      if(res === undefined) return undefined
      else localIDarray = res.map(r => r.id)

      query['localizacoesID'] = localIDarray
      return getEventosForUnderground("created_at", limit, limit * page, query)
      }
    )
    .catch((err) => undefined)
  //const eventosForUnderground = await getEventosForUnderground('created_at', limit, limit * page, query)

  return (
    <>
      <UndergroundContainer_1 data={allEventos}/>
      <UndergroundContainer_2 data={
        (eventosForUnderground !== undefined) ? eventosForUnderground
        : {objects: []}
      }/>
    </>
  )
}
