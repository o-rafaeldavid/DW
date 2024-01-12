import React, { useState } from "react";

export const LoadingScreenContext = React.createContext({})

export default function LoadingScreenContextProvider({children}){
    const [loadingScreen, setLoadingScreen] = useState(false)
    
    return(
        <LoadingScreenContext.Provider value={{loadingScreen, setLoadingScreen}}>{children}</LoadingScreenContext.Provider>
    );
}