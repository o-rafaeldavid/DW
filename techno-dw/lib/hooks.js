import { useEffect, useState } from "react"

export function useEventListener(
    DOC,
    type,
    listener,
    options
){
    useEffect(
        () => {
            if(DOC !== undefined){
                (options !== undefined)
                    ? DOC.addEventListener(type, listener, options)
                    : DOC.addEventListener(type, listener)
                
                return () => {
                    (options !== undefined)
                        ? DOC.removeEventListener(type, listener, options)
                        : DOC.removeEventListener(type, listener)
                }
            }
        }, [DOC]
    )
}

/////////////////////////////////////////////////////////////////////////////////////////////////

export function useWindowSize(){
    const [width, setWidth] = useState(undefined)
    const [height, setHeight] = useState(undefined)
  
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  
    useEffect(() => {
      handleWindowResize();
      window.addEventListener('resize', handleWindowResize);
      return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
  
    return {
        width,
        height
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////

export function useLoadingImage(src){
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(
        () => {
            const img = new Image()
            img.src = src
            img.onload = () => setIsLoaded(true)
        }, [src]
    )
    return isLoaded
}
  