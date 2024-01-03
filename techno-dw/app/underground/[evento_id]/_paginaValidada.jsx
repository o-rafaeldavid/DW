'use client'

import GlitchText from "@/app/components/glitchText/glitchText.jsx"
import Container from "@/app/components/container"
import GlitchBox from "@/app/components/glitchBox/glitchBox"
import ImageBox from "@/app/components/imageBox/imageBox"


import { cosmicToDate, cosmicYear } from "@/lib/misc"
import gsap from "gsap/gsap-core"

import paginaEvento from './_paginaValidada.module.scss'

export default function EventoValidado({eventoDados}){
    console.log(eventoDados)
    const metadata = eventoDados.metadata
/*     
<h4>generos no evento</h4>
{ metadata.generos.map((genero, index) => <li key={`genero-${index}`}>{genero.title}</li>) }
<br/>
<h4>responsavel do evento</h4>
<p>{ metadata.responsaveis.title }</p>
 */

    return(
        <>
            <Container id={paginaEvento.mainContainer}>
                {/*  */}
                <section id={paginaEvento.sectionTitle}>
                    <h1 id={paginaEvento.titulo}>
                        <GlitchText>{eventoDados.title}</GlitchText>
                    </h1>
                    <h2 className={paginaEvento.data}>
                        {cosmicToDate(metadata.data_do_evento, false)}
                    </h2>
                    <h3 className={paginaEvento.data}>
                        {cosmicYear(metadata.data_do_evento)}
                    </h3>
                </section>
                {/*  */}
                <br/><br/><br/>
                {/*  */}
                <section id={paginaEvento.sectionHeroAbout}>
                    <div
                        id={paginaEvento.sobreEvento}
                        dangerouslySetInnerHTML={{__html: metadata.conteudo}}
                    />
                    <GlitchBox id={paginaEvento.hero}>
                        <ImageBox src={metadata.hero.imgix_url}/>
                    </GlitchBox>
                </section>
                {/*  */}
            </Container>
        </>
    )
}