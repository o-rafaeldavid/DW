'use client'

import GlitchText from "@/app/components/glitchText/GlitchText"
import gsap from "gsap/gsap-core"


import paginaEvento from './paginaEvento.module.scss'


export default function EventoValidado({eventoDados}){
    console.log(eventoDados)
    const metadata = eventoDados.metadata
    return(
        <>
            <h1 className={paginaEvento.titulo}>
                <GlitchText>{eventoDados.title}</GlitchText>
            </h1>
            <br/>
            <p><span>Data: </span>{metadata.data_do_evento}</p>
            <br/>
            <h4>generos no evento</h4>
            { metadata.generos.map((genero, index) => <li key={`genero-${index}`}>{genero.title}</li>) }
            <br/>
            <h4>responsavel do evento</h4>
            <p>{ metadata.responsaveis.title }</p>
            <br/>
            <div dangerouslySetInnerHTML={{__html: metadata.conteudo}}></div>
        </>
    )
}