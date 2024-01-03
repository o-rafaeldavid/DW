'use client'

import GlitchBox from "@/app/components/glitchBox/glitchBox"
import ImageBox from "@/app/components/imageBox/imageBox"
import { mapear } from "@/lib/misc"
import { useEffect, useRef, useState } from "react"

export default function UndergroundBests({data, className, rotateZ, incline}){
    let onMountRef = useRef(true)
    let wrapperRef = useRef()
    let ulRef = useRef()

    useEffect(
        () => {
            if(onMountRef.current){
                onMountRef.current = false
                return
            }
            else{
                if(rotateZ !== undefined) ulRef.current.style.setProperty('--rotateZ', rotateZ)
                if(incline !== undefined){
                    wrapperRef.current.style.setProperty(
                        '--perspective-incline',
                        `${mapear(incline, 0, 100, 0, -1000)}px`
                    )
                }
            }
        }, [ulRef.current]
    )



    const [lists, setLists] = useState([])
    useEffect(
        () => {
            let lista = []
            for(let i = 0; i < 5; i++){
                lista.push((data[i] !== undefined) ? data[i] : {slug: i, metadata:{ hero:{ imgix_url: ''}}})
            }
            setLists(lista)
        }, []
    )

    return(
        <div className={className} ref={wrapperRef}>
            <ul ref={ulRef}>
                {
                    lists.map(
                        evento => {
                            return(
                                <li key={`evento-${evento.slug}`}>
                                    <GlitchBox>
                                        <ImageBox
                                            src={evento.metadata.hero.imgix_url}
                                        />
                                    </GlitchBox>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </div>
    )
}