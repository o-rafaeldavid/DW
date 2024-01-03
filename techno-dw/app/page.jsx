import Container from "./components/container"
import GlitchText from "./components/glitchText/glitchText"
import WrappedText from "./components/wrappedText/WrappedText"

export default function Home() {
  return (
    <>
      <Container>
        <WrappedText classOn="technoXuxex"/>
        <GlitchText forText="true">TEXTO BACANZ</GlitchText>
      </Container>
    </>
  )
}
