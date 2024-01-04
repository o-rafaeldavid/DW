'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function UndergroundCarrossel({data}){
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    console.log(data)

    /* router.push(`${pathname}?page=10`) */
    return (
        <></>
    )
}