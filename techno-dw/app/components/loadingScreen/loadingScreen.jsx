'use client'

import GlitchContainer from "../glitchContainer/glitchContainer"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { LoadingScreenContext } from "./context/loadingScreenContext"
import HologramSlider from "../hologramSlider/hologramSlider"


import './loadingScreen.scss'
export default function LoadingScreen(){
    const pathname = usePathname()
    const [show, setShow] = useState(false)

    const {loadingScreen, setLoadingScreen} = useContext(LoadingScreenContext)

    useEffect(() => { setShow(false) }, [pathname])
    useEffect(
        () => {
            if(loadingScreen){
                setShow(true)
                setLoadingScreen(false)
            }
        }, [loadingScreen]
    )


    return(
        <section id="loadingScreen" className={show ? "show" : ""}>
            <GlitchContainer type="box">
                <div id="loadingFlex">
                    <HologramSlider speed={10}>
                        <h1>LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING</h1>
                    </HologramSlider>
                    <HologramSlider speed={10}>
                        <h1>LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING</h1>
                    </HologramSlider>
                    <HologramSlider speed={10}>
                        <h1>LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING</h1>
                    </HologramSlider>
                    <HologramSlider speed={10}>
                        <h1>LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING</h1>
                    </HologramSlider>
                    <HologramSlider speed={10}>
                        <h1>LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING</h1>
                    </HologramSlider>
                    <HologramSlider speed={10}>
                        <h1>LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING</h1>
                    </HologramSlider>
                    <HologramSlider speed={10}>
                        <h1>LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING LOADING</h1>
                    </HologramSlider>
                </div>
            </GlitchContainer>
        </section>
    )
}