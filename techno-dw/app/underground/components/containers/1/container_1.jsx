'use client'

import Container from "@/app/components/container";
import WrappedText from "@/app/components/wrappedText/WrappedText";
import UndergroundBests from "./components/undergroundBests";

import firstContainer from './undergroundFirstContainer.module.scss'
import GlitchContainer from "@/app/components/glitchContainer/glitchContainer";



export default function UndergroundContainer_1({data}){
    return(
        <Container>
            <div id={firstContainer.underground}>
                <GlitchContainer type="wrappedText">
                <WrappedText
                    classOn="underground"
                    rotateZ={'-5deg'}
                />
                </GlitchContainer>
            </div>
            <UndergroundBests
                data={data}
                className={firstContainer.undergroundBests}
                rotateZ={'-5deg'}
                incline={-2}
            />
      </Container>
    )
}