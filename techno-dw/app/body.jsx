"use client"
import Footer from "./footer"
import Header from "./components/header/header";

export default function Body({children, className}){
    const footerShow = (e) => {
        document.querySelector('footer').classList.add('up');
    }

    return(
        <body className={className} onWheel={footerShow}>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </body>
    )
}