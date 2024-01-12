'use client'

import DynamicContainer from '@/app/components/dynamicContainer'
import InnerContainer from '@/app/components/innerContainer'
import GlitchContainer from '@/app/components/glitchContainer/glitchContainer'
import UndergroundCarrossel from './components/undergroundCarrossel'
import { useContext } from 'react'
import { FilterFormContext } from '@/app/contexts/filterFormContext'

import secondContainer from './undergroundSecondContainer.module.scss'
import { useSearchParams } from 'next/navigation'




export default function UndergroundContainer_2({data}){
    const hoje = new Date().toLocaleDateString("pt", {timeZone: "Portugal"})
                            .split('/').reverse().join('-')

                            console.log(data)
    const {setFilterFormData} = useContext(FilterFormContext)
    const searchParams = useSearchParams()
    const checkSearchParam = (searchParam, onNot) => {
        if((searchParams.get(searchParam) === null || searchParams.get(searchParam) === '')) return onNot
        else return <span>{searchParams.get(searchParam)}</span>
    }

    return(
        <>
        <DynamicContainer>
            <InnerContainer id={secondContainer.inner}>
                <h4 id={secondContainer.h4}>
                    <GlitchContainer type="text">MAIS EVENTOS</GlitchContainer>
                </h4>
                <br/>
                <br/>
                <section id={secondContainer.sectionFilters}>
                    <h3>FILTRAGEM</h3>
                    <div>
                        <button onClick={() => { setFilterFormData({activated: true, type: 'search'}) }}>
                            <h3>Nome: {checkSearchParam('search', '---')}</h3>
                        </button>
                        <button onClick={() => { setFilterFormData({activated: true, type: 'date'}) }}>
                            <h3>Data: {checkSearchParam('date1', hoje)} até {checkSearchParam('date2', '---')}</h3>
                        </button>
                        <button onClick={() => { setFilterFormData({activated: true, type: 'genero'}) }}>
                            <h3>VERIFICAR Géneros Escolhidos</h3>
                        </button>
                        <button onClick={() => { setFilterFormData({activated: true, type: 'distrito'}) }}>
                            <h3>VERIFICAR Distritos Escolhidos</h3>
                        </button>
                    </div>
                </section>
                <UndergroundCarrossel data={data} id={secondContainer.carrossel}/>
            </InnerContainer>
        </DynamicContainer>
        </>
    )
}