import Body from './body'

import { Inter } from 'next/font/google'
import { getGlobalData } from '@/lib/cosmic'

import main from "../styles/sass/main.module.scss"
import "../styles/general.css"


const inter = Inter({ subsets: ['latin'] })


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
        <Body className={inter.className}>
          {children}
        </Body>
      </html>
    </>
  )
}
