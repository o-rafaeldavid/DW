'use client'

import { useContext, useEffect, useState } from 'react'
import { FilterFormContext } from '@/app/contexts/filterFormContext'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import './filterForm.scss'


export default function FilterForm({dataFilters, distritosFilter}){
    const [ReactNodeType, setRNT] = useState(<></>)
    const {filterFormData, setFilterDataActivness} = useContext(FilterFormContext)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(
        () => {
            if(filterFormData.type === 'search')
                setRNT(
                    <fieldset className='column'>
                        <label htmlFor="search" name="search"><h5>Procurar por nome</h5></label>
                        <input type="search" name="search" id="search" placeholder='Nome do evento que procuras'/>
                    </fieldset>
                )
            else if(filterFormData.type === 'date'){
                const hoje = new Date().toLocaleDateString("pt", {timeZone: "Portugal"})
                                        .split('/').reverse().join('-')
                setRNT(
                    <fieldset>
                        <div className='column'>
                            <label htmlFor="date1" name="date1"><h5>Data inicial</h5></label>
                            <input type="date" name="date1" id="date1" min={hoje}/>
                        </div>
                        <div className='column'>
                            <label htmlFor="date2" name="date2"><h5>Data final</h5></label>
                            <input type="date" name="date2" id="date2" min={hoje}/>
                        </div>
                    </fieldset>
                )
            }
            else if(filterFormData.type === 'genero'){
                const generosSearch = searchParams.get('generos')
                const generos = (generosSearch === null) ? [] : generosSearch.split(',')
                setRNT(
                    <fieldset>
                        <ul className='colunas'>
                            {dataFilters.map(filter => 
                                <li>
                                    <button type="button" onClick={(e) => {
                                        const nextInput = e.currentTarget.nextElementSibling
                                        nextInput.checked = !nextInput.checked
                                    }}>
                                        <h3 style={{color: filter.metadata.neoncor}}><label id={filter.slug}>{filter.title}</label></h3>
                                        <h3
                                            style={{filter: `
                                                drop-shadow(${filter.metadata.cor} 0 0 10px)
                                                drop-shadow(${filter.metadata.cor} 0 0 4px)
                                            `}}
                                        >
                                            <label id={filter.slug}>{filter.title}</label>
                                        </h3>
                                    </button>
                                    <input
                                        type="checkbox" name="genero" id={filter.slug}
                                        checked={generos.includes(filter.id)}
                                    />
                                </li>
                            )}
                        </ul>
                    </fieldset>
                )
            }
            else if(filterFormData.type === 'distrito'){
                const distritosSearch = searchParams.get('distritos')
                const distritos = (distritosSearch === null) ? [] : distritosSearch.split(',')
                setRNT(
                    <fieldset>
                        <ul className='colunas'>
                            {distritosFilter.map(distrito => 
                                <li>
                                    <button type="button" onClick={(e) => {
                                        const nextInput = e.currentTarget.nextElementSibling
                                        nextInput.checked = !nextInput.checked
                                    }}>
                                        <h3>
                                            <label id={distrito.slug}>{distrito.title}</label>
                                        </h3>
                                        <h3
                                            style={{filter: `
                                                drop-shadow(white 0 0 10px)
                                                drop-shadow(white 0 0 4px)
                                            `}}
                                        >
                                            <label id={distrito.slug}>{distrito.title}</label>
                                        </h3>
                                    </button>
                                    <input
                                        type="checkbox" name="distrito" id={distrito.slug}
                                        checked={distritos.includes(distrito.id)}
                                    />
                                </li>
                            )}
                        </ul>
                    </fieldset>
                )
            }



        }, [filterFormData.type]
    )






    return (
        <form
            id="filterForm"
            param="filterForm"
            className={filterFormData.activated ? 'activated' : ''}
            onSubmit={(e) => {
                e.preventDefault()
                const target = e.currentTarget
                let go = true;

                const URL = new URLSearchParams(searchParams.entries())
                URL.set('page', 0)
                if(filterFormData.type === 'search'){
                    URL.set('search', target.search.value)
                }
                else if(filterFormData.type === 'date'){
                    URL.set('date1', target.date1.value)
                    URL.set('date2', target.date2.value)
                }
                else if(filterFormData.type === 'genero'){
                    let selectedGens = []
                    dataFilters.forEach(filter => {
                        if(target[filter.slug].checked) selectedGens.push(filter.id)
                    })
                    
                    URL.set('generos', selectedGens.join(','))
                }
                else if(filterFormData.type === 'distrito'){
                    let selectedDistricts = []
                    distritosFilter.forEach(distrito => {
                        if(target[distrito.slug].checked) selectedDistricts.push(distrito.id)
                    })
                    
                    URL.set('distritos', selectedDistricts.join(','))
                }




                if(go) {
                    setFilterDataActivness(false)
                    router.push(`${pathname}?${URL.toString()}`, `${pathname}?${URL.toString()}`, { shallow: true, scroll: false })
                }
            }}
        >
            <h2>FILTRAGEM</h2>
            {ReactNodeType}
            <button><h3>PROCURAR</h3></button>
        </form>
    )
}

