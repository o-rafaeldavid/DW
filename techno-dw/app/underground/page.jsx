import Container from "../components/container"
import WrappedText from "../components/wrappedText/WrappedText"
import GlitchText from "../components/glitchText/glitchText"
import UndergroundBests from "./components/undergroundBests"
import InnerContainer from "../components/innerContainer"
import { getAllEventos } from "@/lib/cosmic"

import firstContainer from './undergroundFirstContainer.module.scss'
import secondContainer from './undergroundSecondContainer.module.scss'

export default async function Underground() {
  const allEventos = await getAllEventos()

  return (
    <>
      <Container>
        <div id={firstContainer.underground}>
          <WrappedText
            classOn="underground"
            rotateZ={'-5deg'}
          />
        </div>
        <UndergroundBests
          data={allEventos}
          className={firstContainer.undergroundBests}
          rotateZ={'-5deg'}
          incline={-2}
        />
      </Container>

      {/*
        ===========
        ===========
      */}

      <Container>
        <InnerContainer>
          <h4 className={secondContainer.h4}>
            <GlitchText>MAIS EVENTOS</GlitchText>
          </h4>
          <br/>
          <section className={secondContainer.sectionFilters}>
            <h3>Procurar Por:</h3>
            <h3>Nome</h3>
            <h3>Data</h3>
          </section>
        </InnerContainer>
      </Container>
    </>
  )
}
