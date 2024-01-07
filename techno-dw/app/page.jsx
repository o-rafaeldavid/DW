import { getPaginaBySlug } from "@/lib/cosmic";
import Home from "./home";

export default async function HomeGetData(){
  const homeData = await getPaginaBySlug('pagina-principal')
  return <Home data={homeData}/>
}