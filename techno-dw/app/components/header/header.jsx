'use client'

import HambActivatedProvider from './contexts/hambActivated'
import Hamb from './components/hamb'
import Nav from './components/nav'

import './header.scss'



export default function Header({paginas}){
    return(
        <HambActivatedProvider>
            <header>
                <Hamb/>
                <Nav paginas={paginas}/>
            </header>
        </HambActivatedProvider>
    )
}