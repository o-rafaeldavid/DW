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
        anterior: () => {
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

    let skip = data.skip
    if(skip === undefined) skip = 0
    let limit = data.limit
    let pagina = 0
    let maxPagina = 0
    if(limit !== undefined){
        pagina = (parseInt(skip / data.limit))
        maxPagina = parseInt(data.total / data.limit)
    }



    let lista = useRef()
    const starting = () => mapear(
        data.objects.length,
        4,
        9,
        30,
        40
    )
    const [translateX, setTranslateX] = useState(starting())
    const [selected, setSelected] = useState(0)

    const doNext = (sinal) => {
        const stepX = 100 / (data.objects.length + 1)
        const nextTranslateX = translateX + (sinal * stepX)
        if(
            (sinal < 0 && (starting() - stepX * (data.objects.length - 1)) <= nextTranslateX)
            ||
            (sinal > 0 && nextTranslateX <= starting())
        ){
            setSelected(() => selected - sinal)
            setTranslateX(() => nextTranslateX)
        }
    }

    useEffect(
        () => {
            setSelected(0)
            setTranslateX(starting())
        }, [data.objects]
    )



    const setForTablet = () => {
        if(windowSize.width !== undefined && windowSize.width <= 1300 && lista.current !== undefined){
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
    //mudar entre desktop-tablet
    useEffect(() => {
        setForTablet()
        if(windowSize.width !== undefined && windowSize.width > 1300 && lista.current !== undefined){
            console.log('maior q 1300')
            const ol = lista.current
            ol.querySelectorAll('li:not([param="moreEvents"])').forEach((li, index) => {
                if(index !== selected) li.removeAttribute('param')
            })
        }
    }, [windowSize.width])


    useEventListener(document.body, 'wheel', (e) => {
        const carrossel = document.querySelector('*[id^="undergroundSecondContainer_carrossel"]')
        const boundsCarrossel = carrossel.getBoundingClientRect()
        const inside =
            (boundsCarrossel.left < e.clientX && e.clientX < boundsCarrossel.right)
            &&
            (boundsCarrossel.top < e.clientY && e.clientY < boundsCarrossel.bottom)


        if(!inside) document.body.style.removeProperty('overflow-y')
    })


    const checkNavigationToReturnAtual = () => {

        return {
            anterior: () => (existMoreDataOnCosmic(data).anterior) ?
                                pageNavigation(searchParams, pathname).anterior() :
                                pageNavigation(searchParams, pathname).atual()
                        ,

            proximo: () => (existMoreDataOnCosmic(data).proximo) ?
                                pageNavigation(searchParams, pathname).proximo() :
                                pageNavigation(searchParams, pathname).atual()
        }
    }


    const navigateBtns =
    <>
        <div param="navigateBtns">
            <h3>Páginas</h3>
            <section>
                <button>
                    <Link href={checkNavigationToReturnAtual().anterior()} scroll={false}>
                        <h2>{`<`}</h2>
                    </Link>
                </button>
                <h3>{pagina}/{maxPagina}</h3>
                <button>
                    <Link href={checkNavigationToReturnAtual().proximo()} scroll={false}>
                        <h2>{`>`}</h2>
                    </Link>
                </button>
            </section>
        </div>
    </>

    return (
        <>
            {(windowSize.width > 1300) ? navigateBtns : <></>}
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
                            <Link href={checkNavigationToReturnAtual().proximo()} scroll={false}>
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
                : navigateBtns
            }
        </>
    )
}