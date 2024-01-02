'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import GlitchText from '../../glitchText/GlitchText'
import { useContext, useState } from 'react'
import { HambActivatedContext } from '../contexts/hambActivated'
 
export default function Nav(){
    const { hambActivated, setHambActivated }= useContext(HambActivatedContext)

    const pathname = usePathname()
    const splitted = pathname.split('/')
    const where = '/' + splitted[1]

    const routes = [
        new defRoute('página principal', '/', 'página principal'),
        new defRoute('underground', '/underground', 'calendário dos próximos beats'),
        new defRoute('stay alive', '/stayalive', '------ descrição aqui'),
        new defRoute('nossa missão', '/nossamissao', '------ descrição aqui')
    ]

    const [notActiveHover, setNAH] = useState(false)

    return(
        <nav className={hambActivated ? 'activated' : ''}>
            <ul>
                {
                    routes.map(
                        (route, index) => {
                            const titulo = <h1>{route.name}</h1>
                            const glitch = <GlitchText background='white'>{titulo}</GlitchText>
                            const sameRoute = (yes, no) => (where === route.to) ? yes : no
                            const [hover, setHover] = useState(false)
                            return (
                                <li 
                                    key={`route-${index}`}
                                    onMouseEnter={() => { setNAH(sameRoute(false, true)); setHover(true); }}
                                    onMouseLeave={() => { setNAH(false); setHover(false) }}
                                >
                                    <Link
                                        href={sameRoute('', route.to)}
                                        className={
                                            sameRoute(`active ${(notActiveHover) ? 'sombra' : ''}`, '')
                                        }
                                        onClick={() => setHambActivated(false)}
                                    >
                                        {sameRoute(glitch, (hover) ? glitch : titulo)}
                                        <p>{route.desc}</p>
                                    </Link>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </nav>
    )
}

class defRoute{
    constructor(name, to, desc){
        this.name = name
        this.to = to
        this.desc = desc
    }
}