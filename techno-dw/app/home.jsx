'use client'
import { useWindowSize } from "@/lib/hooks"
import { useEffect, useRef, useState } from "react"
import Container from "./components/container"
import GlitchContainer from "./components/glitchContainer/glitchContainer"
import WrappedText from "./components/wrappedText/WrappedText"
import Luz from "./components/luz/luz"

import home from './home.module.scss'
import { sanitize } from "isomorphic-dompurify"


export default function Home({data}) {
  const windowSize = useWindowSize()
  const [rotateZ, setRotateZ] = useState(20)
  useEffect(
    () => {
      if(rotateZ !== 20 && windowSize.width > 725) setRotateZ(20)
      else if(rotateZ !== 30 && windowSize.width > 450 && windowSize.width <= 725) setRotateZ(30)
      else if(rotateZ !== 40 && windowSize.width <= 450) setRotateZ(40)


    }, [windowSize]
  )

  return (
    <>
      <Container>
        <Luz motion={{
            top: [45, 50],
            left: [0, 60],
            rotate: [-5, 10]
        }}/>
        <Luz motion={{
            top: [30, 40],
            left: [10, 20],
            rotate: [10, 30]
        }}/>
        <Luz motion={{
            top: [70, 30],
            left: [70, 60],
            rotate: [-20, 10]
        }}/>
        {
            (windowSize.width > 870) ?
            <>
                <Luz motion={{
                    top: [50, 30],
                    left: [90, 30],
                    rotate: [-10, 30]
                }}/>
                <Luz motion={{
                    top: [20, 60],
                    left: [5, 40],
                    rotate: [20, -40]
                }}/>
                <Luz motion={{
                    top: [25, 70],
                    left: [30, 80],
                    rotate: [-30, 20]
                }}/>
            </>
            : <></>
        }
        <Luz motion={{
            top: [90, 50],
            left: [70, 90],
            rotate: [10, 40]
        }}/>
        <Luz motion={{
            top: [30, 40],
            left: [75, 85],
            rotate: [-10, 10]
        }}/>



        <GlitchContainer type="wrappedText" id={home.technoXuxex}>
          <WrappedText
            classOn="technoXuxex"
            rotateZ={`${rotateZ}deg`}
            incline={-15}
            girar={true}
          />
        </GlitchContainer>
        <div id={home.desc} dangerouslySetInnerHTML={{__html: sanitize(data.metadata.textinho)}}/>
      </Container>
    </>
  )
}
