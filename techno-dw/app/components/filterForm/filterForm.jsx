'use client'

import { useContext, useEffect, useState } from 'react'
import { FilterFormContext } from '@/app/contexts/filterFormContext'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import './filterForm.scss'


export default function FilterForm({type = undefined}){
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
                        <label for="search" name="search"><h5>Procurar por nome</h5></label>
                        <input type="search" name="search" id="search" placeholder='Nome do evento que procuras'/>
                    </fieldset>
                )
            else if(filterFormData.type === 'date'){
                const hoje = new Date().toLocaleDateString("pt", {timeZone: "Portugal"}).split('/').reverse().join('-')
                setRNT(
                    <fieldset>
                        <div className='column'>
                            <label for="date1" name="date1"><h5>Data inicial</h5></label>
                            <input type="date" name="date1" id="date1" min={hoje}/>
                        </div>
                        <div className='column'>
                            <label for="date2" name="date2"><h5>Data final</h5></label>
                            <input type="date" name="date2" id="date2" min={hoje}/>
                        </div>
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
