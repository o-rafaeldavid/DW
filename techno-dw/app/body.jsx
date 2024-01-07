"use client"
import Footer from "./footer"
import Header from "./components/header/header";
import GlitchContextProvider from "./contexts/glitchContext";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FilterForm from "./components/filterForm/filterForm";
import FilterFormContextProvider, { FilterFormContext } from "./contexts/filterFormContext";




export default function Body({children, className, paginas}){
    return(
        <FilterFormContextProvider>
            <GlitchContextProvider>
                <RealBody className={className} paginas={paginas}>{children}</RealBody>
            </GlitchContextProvider>
        </FilterFormContextProvider>
    )
}






function RealBody({children, className, paginas}){
    const footerShow = () => {
        document.querySelector('footer').classList.add('up');
    }
    const pathname = usePathname()
    const estouUnderground = (pathname === '/underground')

    const [count, setCount] = useState(0)

    useEffect(
        () => {
            const interval = setInterval(
            () => {
                const linkIcon = document.querySelector('link[rel="icon"]')
                linkIcon.href = (count % 2 === 0) ? '/telelinho.ico' : '/faviconestranho.png'

                setCount(count + 1)
            }, 1000
            )

            return () => {
            clearInterval(interval)
            }
        }
    )


    

    const {filterFormData, setFilterDataActivness} = useContext(FilterFormContext)




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
        </body>
    )
}