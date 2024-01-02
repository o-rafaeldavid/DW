'use client'

import { useContext, useEffect, useState } from "react"
import { HambActivatedContext } from "../contexts/hambActivated"



export default function Hamb(){
    const [translate, setTranslate] = useState({x: 0, y: 0})

    const [styleCenter, setStyleCenter] = useState({})
    
    const { hambActivated, setHambActivated }= useContext(HambActivatedContext)


    useEffect(
        () => {
            setStyleCenter((hambActivated) ? {opacity: 0} : {})
        }, [hambActivated]
    )


    return(
        <svg
            x="0px" y="0px"
	        viewBox="0 0 100 100"
            id="hamb"

            onMouseEnter={
                () => {
                    setTranslate({x: 40, y: 40})
                }
            }
            onMouseLeave={
                () => {
                   if(!hambActivated) setTranslate({x: 0, y: 0})
                   else setTranslate({x: 10, y: 10})
                }
            }
            onClick={
                () => {setHambActivated(!hambActivated)}
            }
        >
            <circle cx="10" cy="10" r="10" transform={`translate(${translate.x} ${translate.y})`}/>
            <circle cx="50" cy="10" r="10" transform={`translate(0 ${translate.y})`} style={styleCenter}/>
            <circle cx="90" cy="10" r="10" transform={`translate(-${translate.x} ${translate.y})`}/>

            <circle cx="10" cy="50" r="10" transform={`translate(${translate.x} 0)`} style={styleCenter}/>
            <circle cx="50" cy="50" r="10"/>
            <circle cx="90" cy="50" r="10" transform={`translate(-${translate.x} 0)`} style={styleCenter}/>

            <circle cx="10" cy="90" r="10" transform={`translate(${translate.x} -${translate.y})`}/>
            <circle cx="50" cy="90" r="10" transform={`translate(0 -${translate.y})`} style={styleCenter}/>
            <circle cx="90" cy="90" r="10" transform={`translate(-${translate.x} -${translate.y})`}/>
        </svg>
    )
}