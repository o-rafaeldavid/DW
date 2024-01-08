'use client'

import GlitchContainer from "@/app/components/glitchContainer/glitchContainer"
import CarrosselCard from "./components/carrosselCard"
import { mapear } from "@/lib/misc"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Link from 'next/link'
import { useEventListener, useWindowSize } from "@/lib/hooks"

const existMoreDataOnCosmic = (data) => {
    const {limit, skip, total} = data
    let existance = {
        proximo: false,
        anterior: false
    }

    if(skip !== undefined){
        existance.anterior = true
        if(total - skip > limit) existance.proximo = true
    }
    else if(total > limit) existance.proximo = true
    
    return existance
}

const pageNavigation = (searchParams, pathname) => {
    const URL = new URLSearchParams(searchParams.entries())

    let paginaAtual = parseInt(URL.get('page'))
    if(isNaN(paginaAtual)) paginaAtual = 0
    URL.set('page', paginaAtual + 1)

    return {
        anteiror: () => {
            URL.set('page', paginaAtual - 1)
            return `${pathname}?${URL.toString()}`
        },
        proximo: () => {
            URL.set('page', paginaAtual + 1)
            return `${pathname}?${URL.toString()}`
        },
        atual: () => {
            URL.set('page', paginaAtual)
            return `${pathname}?${URL.toString()}`
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export default function UndergroundCarrossel({data, id}){
    const searchParams = useSearchParams()
            useEffect(
                () => {
                    if(searchParams.toString() !== ''){
                        let body = document.body
                        if(body !== undefined) window.scrollTo(0, body.scrollHeight - window.innerHeight)
                    }
                }, [searchParams]
            )
    const pathname = usePathname()
    const windowSize = useWindowSize()


    let lista = useRef()
    const cursor = {
        started:{
            start_down: useState(false),
            move: useState(false),
            end_up: useState(false)
        },
        position:{
            start_down: useState({x: 0, y: 0}),
            move: useState({x: 0, y: 0}),
            end_up: useState({x: 0, y: 0})
        }
    }
    const starting = mapear(
        data.objects.length,
        4,
        9,
        30,
        40
    )
    const [translateX, setTranslateX] = useState(starting)
    const [selected, setSelected] = useState(0)

    const doNext = (sinal) => {
        const stepX = 100 / (data.objects.length + 1)
        const nextTranslateX = translateX + (sinal * stepX)
        if(
            (sinal < 0 && (starting - stepX * (data.objects.length - 1)) <= nextTranslateX)
            ||
            (sinal > 0 && nextTranslateX <= starting)
        ){
            setSelected(() => selected - sinal)
            setTranslateX(() => nextTranslateX)
        }
    }


    const setForTablet = () => {
        if(windowSize.width <= 1300 && lista.current !== undefined){
            const ol = lista.current
            const parentBounds = ol.getBoundingClientRect()
            ol.querySelectorAll('li:not([param="moreEvents"])').forEach((li) => {
                const liBounds = li.getBoundingClientRect()
                if(parentBounds.top < liBounds.top && liBounds.bottom < parentBounds.bottom){
                    li.setAttribute('param', 'eventSelected')
                }
                else li.removeAttribute('param')
            })
        }
    }
    useEffect(() => {
        setForTablet()
        if(windowSize.width > 1300 && lista.current !== undefined){
            const ol = lista.current
            ol.querySelectorAll('li:not([param="moreEvents"])').forEach((li, index) => {
                if(index !== selected) li.removeAttribute('param')
            })
        }
    }, [windowSize.width])
    // useEffect chamado quando o rato/dedo para de dar 'grab'/'touch'
    useEffect(
        () => {
            if(cursor.started.end_up[0] && cursor.started.start_down[0]){
                const posStarted =
                    cursor.position
                        .start_down[0]

                const posFinishedOnMove =
                    cursor.position
                        .move[0]

                const difference = {
                    x: posStarted.x - posFinishedOnMove.x,
                    y: posStarted.y - posFinishedOnMove.y
                }

                if(Math.abs(difference.x) >= 50 || Math.abs(difference.y) >= 50){
                    const sinal = -1 * Math.sign((windowSize.width > 1300) ? difference.x : difference.y)
                    doNext(sinal)                    
                }



                cursor.started
                    .move[1](false)

                cursor.started
                    .start_down[1](false)

                cursor.started
                    .end_up[1](false)
            }
        }, [cursor.started.end_up[0]]
    )


    const moveIt = {
        start_down: (e, x, y) => {
            e.currentTarget.setAttribute('param', 'grabbing')
            cursor.started
                .start_down[1](true)

            cursor.position
                .start_down[1]({x: x, y: y})
        },
        move: (e, x, y) => {
            if(cursor.started.start_down[0]){
                cursor.started
                    .move[1](true)

                cursor.position
                    .move[1]({x: x, y: y})
            }
        },
        end_up: (e) => {
            e.currentTarget.removeAttribute('param')
            cursor.started
                .end_up[1](true)
        }
    }


    useEventListener(document.body, 'wheel', (e) => {
        const carrossel = document.querySelector('*[id^="undergroundSecondContainer_carrossel"]')
        const boundsCarrossel = carrossel.getBoundingClientRect()
        const inside =
            (boundsCarrossel.left < e.clientX && e.clientX < boundsCarrossel.right)
            &&
            (boundsCarrossel.top < e.clientY && e.clientY < boundsCarrossel.bottom)



        if(!inside) document.body.style.removeProperty('overflow-y')
    })


    return (
        <>
            <div
                id={id}
                onWheel={(e) => {
                    if(windowSize.width > 1300){
                        const body = document.querySelector('body')
                        const sinal = Math.sign(e.nativeEvent.wheelDelta)

                        if(sinal < 0){
                            if(selected < data.objects.length - 1) body.style.setProperty('overflow-y', 'hidden')
                            else body.style.removeProperty('overflow-y')
                        }
                        else{
                            if(selected > 0) body.style.setProperty('overflow-y', 'hidden')
                            else body.style.removeProperty('overflow-y')
                        }

                        doNext(sinal)
                    }
                }}
                onMouseDown={(e) => {
                    moveIt.start_down(e, e.clientX, e.clientY)
                }}
                onMouseMove={(e) => {
                    moveIt.move(e, e.clientX, e.clientY)
                }}
                onMouseUp={(e) =>  {
                    moveIt.end_up(e)
                }}
            >
                <ol
                    ref={lista}
                    style={{ transform: `translate(${(windowSize.width > 1300) ? translateX : 0}%, 0)` }}
                    onScroll={(e) => { setForTablet() }}
                >
                    {data.objects.map(
                        (d, index) => (
                            <CarrosselCard
                                key={`carrsossel-${index}`}
                                eventoInfo={d}
                                selected={(windowSize.width > 1300) ? (selected === index) : true}
                            />
                        )
                    )}
                    {
                        (windowSize.width > 1300) ?
                        <li param="moreEvents">
                            <Link
                                href={
                                    (existMoreDataOnCosmic(data).proximo) ?
                                    pageNavigation(searchParams, pathname).proximo() :
                                    pageNavigation(searchParams, pathname).atual()
                                }
                                scroll={false}
                                onClick={() => {
                                    setSelected(0)
                                    setTranslateX(30)
                                }}
                            >
                                <span>
                                    <h1><GlitchContainer>+</GlitchContainer></h1>
                                    <h2><GlitchContainer>MAIS EVENTOS</GlitchContainer></h2>
                                </span>
                            </Link>
                        </li>

                        : <></>
                    }
                </ol>
                <div param="showOffer"></div>
                <div param="showOffer"></div>
            </div>
            {
                (windowSize.width > 1300) ?
                <div param="navigatePoints">
                    {data.objects.map(
                        (d, index) => <div param={(selected === index) ? 'selected' : ''} key={`point-${index}`}/>
                    )}
                </div>
                : <></>
            }
        </>
    )
}