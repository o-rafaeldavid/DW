import { useEffect, useState } from "react"

export function useEventListener(
    DOC,
    type,
    listener,
    options
){
    useEffect(
        () => {
            (options !== undefined)
                ? DOC.addEventListener(type, listener, options)
                : DOC.addEventListener(type, listener)
            
            return () => {
                (options !== undefined)
                    ? DOC.removeEventListener(type, listener, options)
                    : DOC.removeEventListener(type, listener)
            }
        }
    )
}

/////////////////////////////////////////////////////////////////////////////////////////////////

export function useWindowSize(){
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
  
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
  