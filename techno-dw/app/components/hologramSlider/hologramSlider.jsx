import { useWindowSize } from "@/lib/hooks"
import { useEffect, useRef, useState } from "react"

export default function HologramSlider({id, children, speed = 1, className = ""}){
    let hologramRef = useRef(undefined)
    const windowSize = useWindowSize()
    const [isBigger, setIsBigger] = useState(false)
    const [leftDiv, setLeftDiv] = useState('unset')
    const [nextDiv, setNextDiv] = useState(false)
    useEffect(
        () => {
            const hologram = hologramRef.current
            if(hologram !== undefined && windowSize.width !== undefined){
                const divWithChildren = hologram.querySelector('section > div')

                if(hologram.clientWidth < divWithChildren.clientWidth && !isBigger){
                    setIsBigger(true)
                    setLeftDiv(hologram.clientWidth)

                    setNextDiv(true)
                }
                else if(hologram.clientWidth >= divWithChildren.clientWidth && isBigger){
                    setIsBigger(false)
                    setLeftDiv('unset')
                    setNextDiv(false)
                }
            }
        }, [hologramRef, windowSize]
    )

    const animateRef = useRef(undefined)
    const animateFun = timestamp => {
        const hologram = hologramRef.current
        if(hologram !== undefined && hologram !== null){
            animateRef.current = requestAnimationFrame(animateFun)

            const divWithChildren = hologram.querySelector('section > div')
            const divWidth = divWithChildren.clientWidth

            setLeftDiv(prevLeft => {
                if(prevLeft <= - 1 * divWidth) return 48
                else return prevLeft - 1 * speed
            })
        }
    }
    useEffect(
        () => {
            if(isBigger){
                animateRef.current = requestAnimationFrame(animateFun)
            }

            return () => cancelAnimationFrame(animateRef.current)
        }, [isBigger, animateRef.current]
    )
    return(
        <section
            id={id}
            param='hologramSlider' ref={hologramRef}
            style={{overflow: 'hidden', position: 'relative'}}
            className={className}
        >
            <section style={{
                width: 'fit-content',
                position: 'absolute',
                left: leftDiv,
                display: 'flex',
                gap: 48
            }}>
                <div style={{width: 'fit-content'}}>{children}</div>
                {(nextDiv) ? <div style={{width: 'fit-content'}}>{children}</div> : <></>}
            </section>
        </section>
    )
}