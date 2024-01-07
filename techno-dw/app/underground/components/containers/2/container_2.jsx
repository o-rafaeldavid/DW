'use client'

import DynamicContainer from '@/app/components/dynamicContainer'
import InnerContainer from '@/app/components/innerContainer'
import GlitchContainer from '@/app/components/glitchContainer/glitchContainer'
import UndergroundCarrossel from './components/undergroundCarrossel'
import { useContext } from 'react'
import { FilterFormContext } from '@/app/contexts/filterFormContext'

import secondContainer from './undergroundSecondContainer.module.scss'




export default function UndergroundContainer_2({data}){
    const {setFilterFormData} = useContext(FilterFormContext)

    return(
        <>
        <DynamicContainer>
            <InnerContainer id={secondContainer.inner}>
                <h4 id={secondContainer.h4}>
                    <GlitchContainer type="text">MAIS EVENTOS</GlitchContainer>
                </h4>
                <br/>
                <section id={secondContainer.sectionFilters}>
                    <h3>Procurar Por:</h3>
                    <button onClick={() => { setFilterFormData({activated: true, type: 'search'}) }}><h3>Nome</h3></button>
                    <button onClick={() => { setFilterFormData({activated: true, type: 'date'}) }}><h3>Data</h3></button>
                </section>
                <UndergroundCarrossel data={data} id={secondContainer.carrossel}/>
            </InnerContainer>
        </DynamicContainer>
        </>
    )
}