import Container from "./components/container";
import WrappedText from "./components/wrappedText/WrappedText";
import notFound from "../styles/not-found.module.scss";
import GlitchContainer from "./components/glitchContainer/glitchContainer";
import Link from 'next/link';

export default function NotFoundPage({ statusCode }) {
  return (
  
  <>
  <Container>

  <div className={notFound.errorContainer}>

    <div className={notFound.errorAnimatedText}>
      <GlitchContainer type="wrappedText">
        <WrappedText classOn={"errorTechnoXuxex"}/>
      </GlitchContainer>
    </div>

    <div className={notFound.msgContainer}>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h4> ALGO DE ERRADO<br/>NÃO ESTÁ CERTO</h4>
      <br/>
      <h2><GlitchContainer type="text">(ERRO 404)</GlitchContainer></h2>
      <br/><br/><br/><br/>
      <h6>NÃO CONSEGUIMOS ENCONTRAR<wbr/>A PÁGINA QUE ESTÁS À PROCURA.<br/><br/>TENTA VERIFICAR O URL<wbr/>POR ALGUM POSSIVEL ERRO.</h6>
      <br/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <button><h3><Link href="/"> CONTINUAR PARA A PÁGINA PRINCIPAL</Link></h3></button>
    </div>

   </div>

  </Container>
  </>
    
  )
}