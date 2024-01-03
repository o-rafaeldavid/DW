import Container from "../components/container"
import WrappedText from "../components/wrappedText/WrappedText"
import UndergroundBests from "./components/undergroundBests"
import InnerContainer from "../components/innerContainer"
import { getAllEventos } from "@/lib/cosmic"

import underground from './underground.module.scss'
import GlitchText from "../components/glitchText/glitchText"

export default async function Underground() {
  const allEventos = await getAllEventos()

  return (
    <>
      <Container>
        <div id={underground.underground}>
          <WrappedText
            classOn="underground"
            rotateZ={'-5deg'}
          />
        </div>
        <UndergroundBests
          data={allEventos}
          className={underground.undergroundBests}
          rotateZ={'-5deg'}
          incline={-2}
        />
      </Container>
      <Container>
        <InnerContainer>
          <h4><GlitchText>MAIS EVENTOS</GlitchText></h4>
        </InnerContainer>
      </Container>
    </>
  )
}
