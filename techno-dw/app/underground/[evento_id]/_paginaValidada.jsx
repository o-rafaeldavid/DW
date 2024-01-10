'use client'

import Container from "@/app/components/container"
import GlitchContainer from "@/app/components/glitchContainer/glitchContainer"
import ImageBox from "@/app/components/imageBox/imageBox"
import { useContext, useEffect } from "react"
import { BackgroundBodyContext } from "@/app/contexts/backgroundBody"
import { cosmicToDate, cosmicYear } from "@/lib/misc"

import paginaEvento from './_paginaValidada.module.scss'
import InnerContainer from "@/app/components/innerContainer"
import DynamicContainer from "@/app/components/dynamicContainer"
import HologramSlider from "@/app/components/hologramSlider/hologramSlider"



export default function EventoValidado({eventoDados}){
    const metadata = eventoDados.metadata
    const {setBackgroundBody} = useContext(BackgroundBodyContext)
    useEffect(
        () => {
            setBackgroundBody(metadata.hero.imgix_url)
        }, [metadata.hero.imgix_url]
    )


    return(
        <>
            <Container id={paginaEvento.mainContainer}>
                <ul id={paginaEvento.generos}>
                    {
                        metadata.generos.map((genero, index) => {
                            return (
                                <li key={`genero-${index}`}>
                                    <h6 style={{color: genero.metadata.cor}}>{genero.title}</h6>
                                </li>
                            )
                        })
                    }
                </ul>
                {/*  */}
                <section id={paginaEvento.sectionTitle}>
                    <div id={paginaEvento.tituloDiv}>
                            <h1>
                                <GlitchContainer type="text">{eventoDados.title}</GlitchContainer>
                            </h1>
                        <br/>
                    </div>
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
                <section id={paginaEvento.sectionHero}>
                    <GlitchContainer id={paginaEvento.hero} type="box">
                        <ImageBox src={metadata.hero.imgix_url}/>
                    </GlitchContainer>
                </section>
                {/*  */}
            </Container>
            <DynamicContainer id={paginaEvento.atualizateContainer}>
                <InnerContainer>
                    <h4><GlitchContainer type="text">atualiza-te</GlitchContainer></h4>
                    <div
                        id={paginaEvento.sobreEvento}
                        dangerouslySetInnerHTML={{__html: metadata.conteudo}}
                    />
                </InnerContainer>
            </DynamicContainer>
        </>
    )
}