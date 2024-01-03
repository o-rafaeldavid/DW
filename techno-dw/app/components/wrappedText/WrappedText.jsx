"use client"
import { useEffect, useRef } from "react";
import GlitchText from "../glitchText/glitchText";
import { mapear } from "@/lib/misc";


import wrappedText from "./wrappedText.module.scss"




export default function WrappedText({classOn, style, rotateZ, incline}){
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
                console.log('teste')
                difRefs.forEach(
                    divRef => {
                        if(rotateZ !== undefined) divRef.current.style.setProperty('--rotateZ', rotateZ)
                        if(incline !== undefined){
                            wrapperRef.current.style.setProperty(
                                '--perspective-incline',
                                `${mapear(incline, 0, 100, 0, -1000)}px`
                            )
                        }
                    }
                );
            }
        }, [difRefs[2].current]
    )
    return(
        <>
            <div ref={wrapperRef} className={wrappedText.wrappedText} style={style}>
                <div ref={difRefs[0]}>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                    <GlitchText><div name={classOn}></div></GlitchText>
                </div>
                <div ref={difRefs[1]}>
                <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                </div>
                <div ref={difRefs[2]}>
                <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                    <div name={classOn}></div>
                </div>
            </div>
        </>
    );
}