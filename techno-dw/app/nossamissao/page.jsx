import Container from "../components/container"
import WrappedText from "../components/wrappedText/WrappedText"
import nossaMissaoSyles from "../../styles/nossa-missao.module.scss"
import GlitchContainer from "../components/glitchContainer/glitchContainer";

export default async function NossaMissao() {
  return (
    <>
    <Container>

      <div className={nossaMissaoSyles.NMAnimatedText}>
        
        <GlitchContainer type="wrappedText">
          <WrappedText classOn="nossamissao"/>
        </GlitchContainer>
        
      </div>

      <div className={nossaMissaoSyles.NMContainer}>
        <h1 className={nossaMissaoSyles.NMSubTitle}>
        SOMOS A SOLUÇÃO
        </h1>
      
        <p className={nossaMissaoSyles.NMText} >
        Acompanhar o mundo underground não é uma tarefa fácil, tanto que muitas 
        vezes é dificil saber qual o evento mais proximo que nos fará sentir o céu.
        </p>

        <p className={nossaMissaoSyles.NMText}>
        Propomo-nos a ser a tua bússola guiando-te pelos eventos mais alternativos 
        que alguma vez foste!
        </p>
      </div>
    </Container>
    </>
  )
}
