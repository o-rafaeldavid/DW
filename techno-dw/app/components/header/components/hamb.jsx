'use client'

import { useContext, useEffect, useState } from "react"
import { HambActivatedContext } from "../contexts/hambActivated"
import { isMobile } from 'react-device-detect';


export default function Hamb(){
    const { hambActivated, setHambActivated }= useContext(HambActivatedContext)
    const [translate, setTranslate] = useState({x: 0, y: 0})

    const [styleCenter, setStyleCenter] = useState({})

    const [hover, setHover] = useState(false)


    useEffect(
        () => {
            setStyleCenter((hambActivated) ? {opacity: 0} : {})
            if(!hambActivated){
                if(!isMobile){
                    const pos = (hover) ? 40 : 0
                    setTranslate({x: pos, y: pos})
                }
                else setTranslate({x: 0, y: 0})
            }
        }, [hambActivated]
    )

    return(
        <svg
            x="0px" y="0px"
	        viewBox="0 0 100 100"
            id="hamb"
            className={` ${hambActivated ? 'popit' : ''} ${isMobile ? 'mobile' : ''} `}

            onMouseEnter={
                () => {
                    if(!hambActivated) setTranslate({x: 40, y: 40})
                    
                    if(!isMobile) setHover(true)
                }
            }
            onMouseLeave={
                () => {
                   if(!hambActivated) setTranslate({x: 0, y: 0})
                   else setTranslate({x: 10, y: 10})

                   if(!isMobile) setHover(false)
                }
            }
            onClick={
                () => {
                    setHambActivated(!hambActivated)
                    if(!hambActivated) setTranslate({x: 10, y: 10})
                }
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