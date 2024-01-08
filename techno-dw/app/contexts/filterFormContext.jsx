'use client'
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export const FilterFormContext = React.createContext({})

export default function FilterFormContextProvider({children}){
    const [filterFormData, setFilterFormData] = useState({activated: false, type: ''})

    const setFilterDataActivness = (activness) => setFilterFormData({activated: activness, type: filterFormData.type})
    const setFilterDataType = (type) => setFilterFormData({activated: filterFormData.activated, type: type})

    const pathname = usePathname()
    useEffect(() => {setFilterDataActivness(false)}, [pathname])
    
    return(
        <FilterFormContext.Provider
            value={{
                filterFormData,
                setFilterFormData,
                setFilterDataActivness,
                setFilterDataType
            }}
        >
            {children}
        </FilterFormContext.Provider>
    );
}