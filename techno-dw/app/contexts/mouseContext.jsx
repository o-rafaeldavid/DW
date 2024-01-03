import React, { useState, useMemo } from "react"
import { useEventListener } from "@/lib/hooks";


export const MousePosContext = React.createContext({});


export default function MousePagePosProvider({children}){
    const [mousePagePos, setMousePagePos] = useState({
        x: e.pageX,
        y: e.pageY
    });

    const setarRato = () => {
        setMousePagePos({
            x: e.pageX,
            y: e.pageY
        })
    }

    useEventListener(document, "mousemove", setarRato);

    useMemo(
        () => {
            let timeout = setTimeout(
                () => {
                    setMousePagePos({
                        x: window.innerWidth*0.5,
                        y: window.innerHeight*0.5
                    })
                }, 100
            )

            return () => { clearTimeout(timeout) }
        }, []
    )

    
    
    return(
        <MousePosContext.Provider value={{mousePagePos, setMousePagePos}}>{children}</MousePosContext.Provider>
    );
}