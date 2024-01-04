'use client'

import Container from '@/app/components/container'
import InnerContainer from '@/app/components/innerContainer'
import GlitchContainer from '@/app/components/glitchContainer/glitchContainer'
import secondContainer from './undergroundSecondContainer.module.scss'
import UndergroundCarrossel from './components/undergroundCarrossel'


export default function UndergroundContainer_2({data}){
    return(
        <Container>
            <InnerContainer>
                <h4 className={secondContainer.h4}>
                    <GlitchContainer type="text">MAIS EVENTOS</GlitchContainer>
                </h4>
                <br/>
                <section className={secondContainer.sectionFilters}>
                    <h3>Procurar Por:</h3>
                    <h3>Nome</h3>
                    <h3>Data</h3>
                </section>
                    <UndergroundCarrossel data={data}/>
            </InnerContainer>
        </Container>
    )
}