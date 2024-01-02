import Body from './body'
import { getGlobalData } from '@/lib/cosmic'

import { Inter } from 'next/font/google'
import { Lexend_Peta } from 'next/font/google'
import "../styles/general.scss"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter'})
const lexend_peta = Lexend_Peta({ subsets: ['latin'], variable: '--font-lexend-peta'})

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
      <html lang="en">
        <Body className={`${inter.variable} ${lexend_peta.variable}`}>
          {children}
        </Body>
      </html>
    </>
  )
}
