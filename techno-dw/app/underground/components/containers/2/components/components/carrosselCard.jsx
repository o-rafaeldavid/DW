import ImageBox from "@/app/components/imageBox/imageBox"
import { usePathname } from "next/navigation"
import Link from 'next/link'
import { useState, useEffect } from "react"
import GlitchContainer from "@/app/components/glitchContainer/glitchContainer"
import { cosmicToDate } from "@/lib/misc"

export default function CarrosselCard({eventoInfo, selected = false}){
    const pathname = usePathname()
    const metadata = eventoInfo.metadata
    const idBySlug = parseInt(eventoInfo.slug.split('-')[1]) - 1

    const [texto, setTexto] = useState({
        data: '',
        titulo: '',
        descricao: ''
    })

    useEffect(
        () => {
            setTexto({
                data: cosmicToDate(metadata.data_do_evento, false),
                titulo: eventoInfo.title,
                descricao: metadata.descricao
            })
        }, [eventoInfo]
    )



    const innerList = 
    <>
        <ImageBox src={metadata.hero.imgix_url}/>
        <section>
            <GlitchContainer background="white">
                <div>
                    <h3>{texto.data}</h3>
                    <div>
                        <h3>{texto.titulo}</h3>
                    </div>
                </div>
            </GlitchContainer>
            <section>
                <p>{texto.descricao}</p>
            </section>
        </section>
    </>
    return(
        <li param={ (selected) ? 'eventSelected' : '' }>
            {
                (selected) ?
                <Link href={`${pathname}/${idBySlug}`} scroll={true}>
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