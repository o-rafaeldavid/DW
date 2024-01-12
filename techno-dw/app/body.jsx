"use client"
import Header from "./components/header/header";
import GlitchContextProvider from "./contexts/glitchContext";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FilterForm from "./components/filterForm/filterForm";
import FilterFormContextProvider, { FilterFormContext } from "./contexts/filterFormContext";
import BackgroundBodyContextProvider, { BackgroundBodyContext } from "./contexts/backgroundBody";
import ImageBox from "./components/imageBox/imageBox";
import LoadingScreen from "./components/loadingScreen/loadingScreen";
import LoadingScreenContextProvider from "./components/loadingScreen/context/loadingScreenContext";




export default function Body({children, className, paginas, dataFilters, distritosFilter}){
    return(
        <LoadingScreenContextProvider>
            <FilterFormContextProvider>
                <BackgroundBodyContextProvider>
                    <GlitchContextProvider>
                        <RealBody
                            className={className}
                            paginas={paginas}
                            dataFilters={dataFilters}
                            distritosFilter={distritosFilter}>{children}</RealBody>
                    </GlitchContextProvider>
                </BackgroundBodyContextProvider>
            </FilterFormContextProvider>
        </LoadingScreenContextProvider>
    )
}






function RealBody({children, className, paginas, dataFilters, distritosFilter}){
    const pathname = usePathname()
    const estouUnderground = (pathname === '/underground')
    const estouBueUnder = (pathname.includes('/underground/'))

    const [count, setCount] = useState(0)

    useEffect(
        () => {
            const interval = setInterval(
            () => {
                const linkIcon = document.querySelector('link[rel="icon"]')
                linkIcon.href = `/favincons/${count % 10}.svg`

                setCount(count + 1)
            }, 1000
            )

            return () => {
                clearInterval(interval)
            }
        }
    )


    

    const {filterFormData, setFilterDataActivness} = useContext(FilterFormContext)
    const {backgroundBody} = useContext(BackgroundBodyContext)




    return(
        <body
            className={className}
            onClick={(e) => {
                if(estouUnderground && filterFormData.activated){
                    const filterForm = document.getElementById('filterForm')
                    const filterFormBounds = filterForm.getBoundingClientRect()

                    const isInsideFilterForm =
                        (filterFormBounds.top < e.clientY && e.clientY < filterFormBounds.bottom)
                        &&
                        (filterFormBounds.left < e.clientX && e.clientX < filterFormBounds.right)


                    
                    if(!isInsideFilterForm) setFilterDataActivness(false)
                }
            }}
        >
            <Header paginas={paginas}/>
            <main>
                {children}
            </main>
            {estouUnderground ? <FilterForm type="search" dataFilters={dataFilters} distritosFilter={distritosFilter}/> : <></>}
            {estouBueUnder ?
                <div id="bgContainFoto">
                    <section></section>
                    <ImageBox id="bgFoto" src={backgroundBody}/>
                </div>
            : <></>}
            <LoadingScreen/>
        </body>
    )
}