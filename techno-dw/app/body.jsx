"use client"
import Footer from "./footer"
import Header from "./components/header/header";
import GlitchContextProvider from "./contexts/glitchContext";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FilterForm from "./components/filterForm/filterForm";
import FilterFormContextProvider, { FilterFormContext } from "./contexts/filterFormContext";
import BackgroundBodyContextProvider, { BackgroundBodyContext } from "./contexts/backgroundBody";
import ImageBox from "./components/imageBox/imageBox";




export default function Body({children, className, paginas}){
    return(
        <FilterFormContextProvider>
            <BackgroundBodyContextProvider>
                <GlitchContextProvider>
                    <RealBody className={className} paginas={paginas}>{children}</RealBody>
                </GlitchContextProvider>
            </BackgroundBodyContextProvider>
        </FilterFormContextProvider>
    )
}






function RealBody({children, className, paginas}){
    const footerShow = () => {
        document.querySelector('footer').classList.add('up');
    }
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
            onWheel={footerShow}
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
            <Footer/>
            {estouUnderground ? <FilterForm type="search"/> : <></>}
            {estouBueUnder ?
                <div id="bgContainFoto">
                    <section></section>
                    <ImageBox id="bgFoto" src={backgroundBody}/>
                </div>
            : <></>}
        </body>
    )
}