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

    <div>

       <h1 className={notFound.errorTitle}> ALGO DE ERRADO <br></br> NÃO ESTÁ CERTO </h1>

       <p className={notFound.errorSubTitle}> (ERRO 404) </p>

       <p className={notFound.errorText}> NÃO CONSEGUIMOS ENCONTRAR A PÁGINA QUE ESTÁS À PROCURA. <br></br> TENTA VERIFICAR O URL POR ALGUM POSSIVEL ERRO. </p>

       <ul>
         <li><Link href="/" className={notFound.errorListItems}> CONTINUAR PARA A PÁGINA PRINCIPAL </Link></li>
       </ul>

    </div>

   </div>

  </Container>
  </>
    
  )
}