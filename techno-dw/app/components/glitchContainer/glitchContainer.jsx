"use client"

import { useEffect, useRef, useState, useContext } from 'react'
import { GlitchContext } from '@/app/contexts/glitchContext'
import glitchContainer from './glitchContainer.module.scss'

export default function GlitchContainer({children, background = 'black', type = 'text', id}){
    const { glitch_isActivated } = useContext(GlitchContext)

    const [glitchIt, setGlitchIt] = useState(false)
    let containerRef = useRef()
    
    useEffect(
        () => {
            if(glitch_isActivated){
                let wrapped = undefined
                let wrappingTimeout = -1
                // efeito de zoom em wrappers de texto
                if(type === 'wrappedText' && containerRef.current !== undefined){
                    wrapped = containerRef.current.querySelector('div')
                    wrapped.style.setProperty('perspective', `${Math.random() * 200 + 700}px`)
                    wrappingTimeout = setTimeout(
                        () => {
                            wrapped.style.removeProperty('perspective')
                        }, 50
                    )
                }
                let timeout = setTimeout(
                    () => {
                        setGlitchIt(!glitchIt)
                        return () => clearTimeout(timeout)
                    }, ((!glitchIt) ? 1000 : (Math.random() * 300 + 200))
                )

                return () => {
                    clearTimeout(timeout)
                    clearTimeout(wrappingTimeout)

                }
            }
            else{
                return
            }
        }, [glitchIt, glitch_isActivated]
    )


    let typeClass
    if(type === 'text') typeClass = glitchContainer.text
    else if(type === 'box') typeClass = glitchContainer.box
    else if(type === 'wrappedText') typeClass = glitchContainer.wrappedText

    return(
        <span
            param="glitchContainer"
            ref={containerRef}
            className={`
                ${glitchContainer.glitch} 
                ${(glitchIt) ? glitchContainer.glitchIt : ''} 
                ${(background === 'black') ? glitchContainer.black : glitchContainer.white}
                ${typeClass}
            `}
            id={id}
        >
            {(type === 'wrappedText') ? <></> : <span>{children}</span>}
            {children}
            {(type === 'wrappedText') ? <></> : <span>{children}</span>}
        </span>
    )
}