'use client'
import { useRef, useEffect } from "react"


import luz from './luz.module.scss'

export default function Luz({motion, randomizer = 0.01}){
    let luzRef = useRef(undefined)
    useEffect(
        () => {
            const luz = luzRef.current
            if(luz !== undefined){
                luz.style.setProperty('--rotate-start', motion.rotate[0] + 'deg')
                luz.style.setProperty('--rotate-to', motion.rotate[1] + 'deg')
                luz.style.setProperty('--top-start', motion.top[0] + '%')
                luz.style.setProperty('--top-to', motion.top[1] + '%')
                luz.style.setProperty('--left-start', motion.left[0] + '%')
                luz.style.setProperty('--left-to', motion.left[1] + '%')
            }
        }, [luzRef.current, motion]
    )

    let reqRef = useRef()
    const randomizeShowIt = timestamp => {
        reqRef.current = requestAnimationFrame(randomizeShowIt)

        if(Math.random() < randomizer && luzRef.current !== undefined){
            luzRef.current.setAttribute('param', 'glitchIt')
            let timeout = setTimeout(
                () => {
                    luzRef.current.removeAttribute('param')
                    return () => clearTimeout(timeout)
                }, 100
            )
        }
    }
    useEffect(
        () => {
            reqRef.current = requestAnimationFrame(randomizeShowIt)
            return () => cancelAnimationFrame(reqRef.current)
        }
    )
    return(
        <div className={luz.luz} ref={luzRef}/>
    )
}