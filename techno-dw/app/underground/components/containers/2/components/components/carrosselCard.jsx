import ImageBox from "@/app/components/imageBox/imageBox"
import { usePathname } from "next/navigation"
import Link from 'next/link'
import { useState, useEffect, useContext } from "react"
import GlitchContainer from "@/app/components/glitchContainer/glitchContainer"
import { cosmicToDate } from "@/lib/misc"
import HologramSlider from "@/app/components/hologramSlider/hologramSlider"
import { useWindowSize } from "@/lib/hooks"
import { LoadingScreenContext } from "@/app/components/loadingScreen/context/loadingScreenContext"

export default function CarrosselCard({eventoInfo, selected = false}){
    const {setLoadingScreen} = useContext(LoadingScreenContext)
    const windowSize = useWindowSize()

    const pathname = usePathname()
    const metadata = eventoInfo.metadata
    const idBySlug = parseInt(eventoInfo.slug.split('-')[1]) - 1

    const [texto, setTexto] = useState({
        data: '',
        titulo: '',
        descricao: ''
    })

    const [generos, setGeneros] = useState([])

    const [spot, setSpot] = useState('')



    useEffect(
        () => {
            setTexto({
                data: cosmicToDate(metadata.data_do_evento, false),
                titulo: eventoInfo.title,
                descricao: `${metadata.descricao.split(' ').slice(0, 16).join(' ')} [...]`
            })
            setGeneros(metadata.generos)
            setSpot(metadata.localizacao.title)
        }, [eventoInfo]
    )



    const innerList = 
    <>
        <ImageBox src={metadata.hero.imgix_url}/>
        <section>
            <GlitchContainer background="white">
                <div>
                    <h3>{texto.data}</h3>
                    <HologramSlider>
                        <h3>{texto.titulo}</h3>
                    </HologramSlider>
                </div>
            </GlitchContainer>
            <section>
                <p>{texto.descricao}</p>
                <h3>{spot}</h3>
            </section>
            
            {(windowSize.width > 1300) ?
                    <>
                    <HologramSlider>
                        <ul>
                            {generos.map((genero, index) => {
                                return (
                                    <li key={`generos-${index}`}>
                                        <h6
                                            style={{
                                                color: genero.metadata.neoncor,
                                                filter: `
                                                    drop-shadow(${genero.metadata.cor} 0 0 10px)
                                                    drop-shadow(${genero.metadata.cor} 0 0 4px)
                                                `}}
                                        >
                                            {genero.title}
                                        </h6>
                                    </li>
                                )
                            })}
                        </ul>
                    </HologramSlider>
                    </>

                : <></>}
        </section>
    </>
    return(
        <li param={ (selected) ? 'eventSelected' : '' }>
            {
                (selected) ?
                    <Link href={`${pathname}/${idBySlug}`} scroll={true} onClick={() => {setLoadingScreen(true)}}>
                        {innerList}
                    </Link>
                    :
                    <section>
                        {innerList}
                    </section>
            }
        </li>
    )
}