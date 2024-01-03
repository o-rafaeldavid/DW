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

export function useDeviceSize(){
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
  