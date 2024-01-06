import { useEffect, useState } from 'react'
import { useLoadingImage } from '@/lib/hooks'
import imageBox from './imageBox.module.scss'

export default function ImageBox({id, src, width, height}){
    const [style, setStyle] = useState({})
    const loadedImg = useLoadingImage(src)

    useEffect(
        () => {
            if(width == undefined && height == undefined){
                if(!loadedImg) setStyle({})
                else setStyle({ backgroundImage: `url(${src})` })
                }
            else{
                if(width !== undefined) height = 'auto'
                else width = 'auto'

                if(!loadedImg){
                    setStyle({
                        width: width,
                        height: height
                    })
                }
                else{
                    setStyle({
                        backgroundImage: `url(${src})`,
                        width: width,
                        height: height
                    })
                }
            }
        }, [loadedImg, src]
    )



    return(
        <div
            param="imageBox"
            id={id}
            className={`${imageBox.box} ${loadedImg ? '' : imageBox.loading}`}
            style={style}
        >
        </div>
    )
}