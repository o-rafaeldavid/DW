"use client"

import { useEffect, useState } from 'react'
import glitchText from './glitchText.module.scss'

export default function GlitchText({children, background = 'black'}){
    const [glitchIt, setGlitchIt] = useState(false)
    
    useEffect(
        () => {
            let timeout = setTimeout(
                () => {
                    setGlitchIt(!glitchIt)
                    return () => clearTimeout(timeout)
                }, ((!glitchIt) ? 1000 : (Math.random() * 300 + 200))
            )

            return () => clearTimeout(timeout)
        }, [glitchIt]
    )

    return(
        <span
            param="glitchText"
            className={`
                ${glitchText.glitch} 
                ${glitchText.glitchIt} 
                ${(background === 'black') ? glitchText.black : glitchText.white}
            `}
        >
            <span>{children}</span>
            {children}
            <span>{children}</span>
        </span>
    )
}