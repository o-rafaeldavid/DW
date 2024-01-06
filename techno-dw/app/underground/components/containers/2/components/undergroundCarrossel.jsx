'use client'

import GlitchContainer from "@/app/components/glitchContainer/glitchContainer"
import ImageBox from "@/app/components/imageBox/imageBox"
import { cosmicToDate } from "@/lib/misc"
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

const pageNavigation = (paginaAtual, pathname) => {
    paginaAtual = parseInt(paginaAtual)
    if(isNaN(paginaAtual)) paginaAtual = 0

    const anteiror = `${pathname}?page=${paginaAtual - 1}`
    const proximo = `${pathname}?page=${paginaAtual + 1}`
    const atual = `${pathname}?page=${paginaAtual}`

    return {
        anteiror,
        proximo,
        atual
    }
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

export default function UndergroundCarrossel({data, id}){
    const searchParams = useSearchParams()
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
    const [translateX, setTranslateX] = useState(30)
    const [translateY, setTranslateY] = useState(100)
    const [selected, setSelected] = useState(0)


    const doNext = (sinal) => {
        const stepX = 20
        const nextTranslateX = translateX + (sinal * stepX)

        const stepY = 100 + 24 * 2 + 46
        const nextTranslateY = translateY + (sinal * stepY)

        if(
            ((30 - 2 * stepX * (data.objects.length - 2)) <= nextTranslateX &&
            nextTranslateX <= 30)
            &&
            ((100 - 2 * stepY * (data.objects.length - 2)) <= nextTranslateY &&
            nextTranslateY <= 100)
        ){
            setSelected((prev) => selected - sinal)
            setTranslateX((prev) => nextTranslateX)
            setTranslateY((prev) => nextTranslateY)
        }
    }
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
                const body = document.querySelector('body')
                const sinal = Math.sign(e.nativeEvent.wheelDelta)

                if(sinal < 0){
                    console.log('para a frente')
                    console.log(selected < data.objects.length - 1)
                    if(selected < data.objects.length - 1) body.style.setProperty('overflow-y', 'hidden')
                    else body.style.removeProperty('overflow-y')
                }
                else{
                    console.log('para tras')
                    console.log(selected > 0)
                    if(selected > 0) body.style.setProperty('overflow-y', 'hidden')
                    else body.style.removeProperty('overflow-y')
                }

                doNext(sinal)
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
            onTouchStart={(e) => {
                document.querySelector('body').style.setProperty('overflow-y', 'hidden')
                moveIt.start_down(e, e.touches[0].clientX, e.touches[0].clientY)
            }}
            onTouchMove={(e) => {
                moveIt.move(e, e.touches[0].clientX, e.touches[0].clientY)
            }}
            onTouchEnd={(e) => {
                document.querySelector('body').style.removeProperty('overflow-y')
                moveIt.end_up(e)
            }}
        >
            <ol
                ref={lista}
                style={{
                    transform: `
                        translate(
                            ${(windowSize.width > 1300) ? translateX : 0}%,
                            ${(windowSize.width <= 1300) ? translateY : 0}px
                        )
                    `
                }}
            >
                {data.objects.map(
                    (d, index) => (
                        <CarrosselCard
                            key={`carrsossel-${index}`}
                            eventoInfo={d}
                            selected={(selected === index)}
                        />
                    )
                )}
                {
                    (windowSize.width > 1500) ?
                    <li param="moreEvents">
                        <Link
                            href={
                                (existMoreDataOnCosmic(data).proximo) ?
                                pageNavigation(searchParams.get('page'), pathname).proximo :
                                pageNavigation(searchParams.get('page'), pathname).atual
                            }
                            scroll={false}
                            onClick={() => {
                                setSelected(0)
                                setTranslateX(30)
                                setTranslateY(100)
                            }}
                        >
                            <span>
                                <h1><GlitchContainer>+</GlitchContainer></h1>
                                <h2><GlitchContainer>MAIS EVENTOS</GlitchContainer></h2>
                            </span>
                        </Link>
                    </li>

                    : <li></li>
                }
            </ol>
            <div param="showOffer"></div>
            <div param="showOffer"></div>
        </div>
        <div param="navigatePoints">
            {data.objects.map(
                (d, index) => <div param={(selected === index) ? 'selected' : ''}/>
            )}
        </div>
        </>
    )
}


/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


function CarrosselCard({eventoInfo, selected = false}){
    const pathname = usePathname()
    const metadata = eventoInfo.metadata
    const idBySlug = parseInt(eventoInfo.slug.split('-')[1]) - 1

    const [texto, setTexto] = useState({
        data: '',
        titulo: '',
        descricao: ''
    })

    useEffect(
        () => {
            setTexto({
                data: cosmicToDate(metadata.data_do_evento, false),
                titulo: eventoInfo.title,
                descricao: metadata.descricao
            })
        }, [eventoInfo]
    )

    const innerList = 
    <>
        <ImageBox src={metadata.hero.imgix_url}/>
        <section>
            <GlitchContainer background="white">
                <div>
                    <h3>{texto.data}</h3>
                    <div>
                        <h3>{texto.titulo}</h3>
                    </div>
                </div>
            </GlitchContainer>
            <section>
                <p>{texto.descricao}</p>
            </section>
        </section>
    </>
    return(
        <li param={selected ? 'eventSelected' : ''}>
            {
                (selected) ?
                <Link href={`${pathname}/${idBySlug}`} scroll={true}>
                    {innerList}
                </Link>
                :
                <section>
                    {innerList}
                </section>
            }
        </li>
    )
}