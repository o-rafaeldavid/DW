"use client"
import Footer from "./footer"
import Header from "./components/header/header";
import GlitchContextProvider from "./contexts/glitchContext";
import { useEffect, useState } from "react";

export default function Body({children, className, paginas}){
    const footerShow = () => {
        document.querySelector('footer').classList.add('up');
    }

    /* const [count, setCount] = useState(0)

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
    ) */

    return(
        <GlitchContextProvider>
            <body className={className} onWheel={footerShow}>
                <Header paginas={paginas}/>
                <main>
                    {children}
                </main>
                <Footer/>
            </body>
        </GlitchContextProvider>
    )
}