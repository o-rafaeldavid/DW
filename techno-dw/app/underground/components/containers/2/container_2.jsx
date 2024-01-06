'use client'

import DynamicContainer from '@/app/components/dynamicContainer'
import InnerContainer from '@/app/components/innerContainer'
import GlitchContainer from '@/app/components/glitchContainer/glitchContainer'
import UndergroundCarrossel from './components/undergroundCarrossel'


import secondContainer from './undergroundSecondContainer.module.scss'


export default function UndergroundContainer_2({data}){
    return(
        <DynamicContainer>
            <InnerContainer id={secondContainer.inner}>
                <h4 id={secondContainer.h4}>
                    <GlitchContainer type="text">MAIS EVENTOS</GlitchContainer>
                </h4>
                <br/>
                <section id={secondContainer.sectionFilters}>
                    <h3>Procurar Por:</h3>
                    <h3>Nome</h3>
                    <h3>Data</h3>
                </section>
                <UndergroundCarrossel data={data} id={secondContainer.carrossel}/>
            </InnerContainer>
        </DynamicContainer>
    )
}