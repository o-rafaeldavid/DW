import Body from './body'
import { getGlobalData } from '@/lib/cosmic'

import main from "../styles/modules/main.module.scss"
import "../styles/general.scss"
import Head from 'next/head'


export async function generateMetadata() {
  const metaDataPrincipal = await getGlobalData()
  return {
    title: metaDataPrincipal.metadata.site_title,
    description: metaDataPrincipal.metadata.site_tag,
  };
}

export default async function RootLayout({ children }) {

  return (
    <>
      <html lang="en" className={main.fundo}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Lexend+Peta:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        </Head>
        <Body className={main.body}>
          {children}
        </Body>
      </html>
    </>
  )
}
