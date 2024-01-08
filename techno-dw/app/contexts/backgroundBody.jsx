import React, { useState } from "react";

export const BackgroundBodyContext = React.createContext({})

export default function BackgroundBodyContextProvider({children}){
    const [backgroundBody, setBackgroundBody] = useState('')
    
    return(
        <BackgroundBodyContext.Provider value={{backgroundBody, setBackgroundBody}}>{children}</BackgroundBodyContext.Provider>
    );
}