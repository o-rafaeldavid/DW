import React, { useState } from "react";

export const GlitchContext = React.createContext({})

export default function GlitchContextProvider({children}){
    const [glitch_isActivated, setGlitch_isActivated] = useState(true)
    
    return(
        <GlitchContext.Provider value={{glitch_isActivated, setGlitch_isActivated}}>{children}</GlitchContext.Provider>
    );
}