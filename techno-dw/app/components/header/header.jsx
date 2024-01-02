'use client'

import HambActivatedProvider from './contexts/hambActivated'
import Hamb from './components/hamb'
import Nav from './components/nav'

import './header.scss'



export default function Header(){
    return(
        <HambActivatedProvider>
            <header>
                <Hamb/>
            </header>
            <Nav/>
        </HambActivatedProvider>
    )
}