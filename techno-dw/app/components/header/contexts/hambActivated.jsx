import React, { useState } from "react";

export const HambActivatedContext = React.createContext({})

export default function HambActivatedProvider({children}){
    const [hambActivated, setHambActivated] = useState(false)
    
    return(
        <HambActivatedContext.Provider value={{hambActivated, setHambActivated}}>{children}</HambActivatedContext.Provider>
    );
}