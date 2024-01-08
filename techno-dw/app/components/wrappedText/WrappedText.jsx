"use client"
import { useEffect, useRef } from "react";
import { mapear } from "@/lib/misc";


import wrappedText from "./wrappedText.module.scss"




export default function WrappedText({classOn, style, rotateZ, incline, girar = false}){
    let onMountRef = useRef(true)
    let difRefs = [useRef(), useRef(), useRef()]
    let wrapperRef = useRef()

    useEffect(
        () => {
            if(onMountRef.current){
                onMountRef.current = false
                return
            }
            else{
                difRefs.forEach(
                    divRef => {
                        const div = divRef.current
                        if(div !== undefined){
                            if(rotateZ !== undefined) div.style.setProperty('--rotateZ', rotateZ)
                            if(incline !== undefined){
                                wrapperRef.current.style.setProperty(
                                    '--perspective-incline',
                                    `${mapear(incline, 0, 100, 0, -1000)}px`
                                )
                            }
                        }
                    }
                );
            }
        }, [difRefs[2].current, incline, rotateZ]
    )


    let divsInside = []
    for(let i = 0; i < 32; i++){ divsInside.push(<div key={`div-${i}`} name={classOn} girar={`${girar}`}></div>) }
    return(
        <>
            <div ref={wrapperRef} className={wrappedText.wrappedText} style={style}>
                <div ref={difRefs[0]}>
                    {divsInside}
                </div>
                <div ref={difRefs[1]}>
                <div name={classOn}></div>
                    {divsInside}
                </div>
                <div ref={difRefs[2]}>
                <div name={classOn}></div>
                    {divsInside}
                </div>
            </div>
        </>
    );
}