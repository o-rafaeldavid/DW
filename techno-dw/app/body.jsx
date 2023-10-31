"use client"
import Footer from "./footer"

import main from "../styles/sass/main.module.scss"
import { useRef } from "react"

export default function Body({children, className}){
    const footerShow = (e) => {
        document.querySelector('footer').classList.add('up');
    }

    return(
        <body className={className} onWheel={footerShow}>
            {children}
            <Footer className={main.footer}/>
        </body>
    )
}