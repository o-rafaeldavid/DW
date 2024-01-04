"use client"
import Footer from "./footer"
import Header from "./components/header/header";
import GlitchContextProvider from "./contexts/glitchContext";


export default function Body({children, className}){
    const footerShow = (e) => {
        document.querySelector('footer').classList.add('up');
    }

    return(
        <GlitchContextProvider>
            <body className={className} onWheel={footerShow}>
                <Header/>
                <main>
                    {children}
                </main>
                <Footer/>
            </body>
        </GlitchContextProvider>
    )
}