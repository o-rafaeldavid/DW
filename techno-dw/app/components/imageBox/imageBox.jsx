import { useEffect, useState } from 'react'
import imageBox from './imageBox.module.scss'

export default function ImageBox({id, src, width, height}){
    const [style, setStyle] = useState({})

    useEffect(
        () => {
            if(width == undefined && height == undefined){
                setStyle({
                    backgroundImage: `url(${src})`
                })
            }
            else{
                if(width !== undefined) height = 'auto'
                else width = 'auto'

                setStyle({
                    backgroundImage: `url(${src})`,
                    width: width,
                    height: height
                })
            }
        }, []
    )


    return(
        <div
            param="imageBox"
            id={id}
            className={imageBox.box}
            style={style}
        >
        </div>
    )
}