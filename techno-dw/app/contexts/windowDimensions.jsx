'use client'

import React, { useState } from "react"
import { useEventListener } from "@/lib/hooks";



export const WindowDimensionContext = React.createContext({});

export default function WindowDimensionProvider({children}){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const setarWidth = (e) => setWindowWidth(window.innerWidth)
    const setarHeight = (e) => setWindowHeight(window.innerHeight)

    useEventListener(window, "resize", setarWidth);
    useEventListener(window, "resize", setarHeight);
    
    return(
        <WindowDimensionContext.Provider
            value={{
                windowWidth, setWindowWidth,
                windowHeight, setWindowHeight
            }}
        >
            {children}
        </WindowDimensionContext.Provider>
    );
}