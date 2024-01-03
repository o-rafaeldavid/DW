'use client'


import { useEffect, useState } from 'react'
import glitchBox from './glitchBox.module.scss'


export default function GlitchBox({id, children}){
    const [glitchIt, setGlitchIt] = useState(false)

    useEffect(
        () => {
            let timeout = setTimeout(
                () => {
                    setGlitchIt(!glitchIt)
                    return () => clearTimeout(timeout)
                }, ((!glitchIt) ? 2000 : (Math.random() * 300 + 200))
            )

            return () => clearTimeout(timeout)
        }, [glitchIt]
    )


    return(
        <section
            param="glitchBox"
            id={id}
            className={`
                ${glitchBox.glitch} 
                ${(glitchIt) ? glitchBox.glitchIt : ''} 
            `}
        >
            <section>{children}</section>
                {children}
            <section>{children}</section>
        </section>
    )
}