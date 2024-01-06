
import Container from "./components/container"
import GlitchContainer from "./components/glitchContainer/glitchContainer"
import GlitchText from "./components/glitchContainer/glitchContainer"
import WrappedText from "./components/wrappedText/WrappedText"

export default function Home() {
  return (
    <>
      <Container>
        <GlitchContainer type="wrappedText">
          <WrappedText classOn="technoXuxex"/>
        </GlitchContainer>
        <GlitchText forText="true">TEXTO BACANZ</GlitchText>
      </Container>
    </>
  )
}
