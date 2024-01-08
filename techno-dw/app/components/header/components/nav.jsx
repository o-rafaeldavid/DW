
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import GlitchContainer from '../../glitchContainer/glitchContainer'
import { useContext, useEffect, useState } from 'react'
import { HambActivatedContext } from '../contexts/hambActivated'
import { isMobile } from 'react-device-detect';

 
export default function Nav({paginas}){
    const { hambActivated, setHambActivated }= useContext(HambActivatedContext)

    const pathname = usePathname()
    const splitted = pathname.split('/')
    const where = '/' + splitted[1]
    
    const [notActiveHover, setNAH] = useState(false)





    return(
        <nav
            className={hambActivated ? 'activated' : ''}
            onClick={() => setHambActivated(false)}
        >
            <ul>
                {
                    paginas.map(
                        (paginaInfo, index) => {
                            const titulo = <h1>{paginaInfo.title}</h1>
                            const glitch = <GlitchContainer background='white'>{titulo}</GlitchContainer>

                            const metadata = paginaInfo.metadata
                            const route = `${metadata.route}`

                            const sameRoute = (yes, no) => (where === route) ? yes : no
                            const [hover, setHover] = useState(false)
                            return (
                                <li 
                                    key={`route-${index}`}
                                    onMouseEnter={() => { setNAH(sameRoute(false, true)); setHover(true); }}
                                    onMouseLeave={() => { setNAH(false); setHover(false) }}
                                >
                                    <Link
                                        href={sameRoute('', route)}
                                        className={
                                            sameRoute(`
                                                active 
                                                ${(notActiveHover) ? 'sombra' : ''}
                                                ${isMobile ? 'mobile' : ''}
                                            `, '')
                                        }
                                    >
                                        {sameRoute(glitch, (hover) ? glitch : titulo)}
                                        <p>{metadata.descricao}</p>
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