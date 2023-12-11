"use client"
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import technoXuxex from "@/styles/sass/wrappedText/technoXuxex.module.scss"




export default function WrappedText({classOn}){
    let inicializarTechnoXuxex = useRef(true);
    let refTechnoXuxex = useRef(undefined);

    useEffect(
        () => {
            if(inicializarTechnoXuxex.current){
                inicializarTechnoXuxex = false;
                return;
            }

            const scene = refTechnoXuxex.current;
            const firstDiv = scene.querySelector("div > div");
            const pseudo = window.getComputedStyle(firstDiv, ":before");
            console.log(pseudo.width)

        }, [inicializarTechnoXuxex]
    );

    return(
        <>
            <div className={technoXuxex.wrappedText} ref={refTechnoXuxex}>
                <div className={technoXuxex.mainText}>
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
                <div>
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
                <div>
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