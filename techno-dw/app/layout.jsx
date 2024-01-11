import Body from './body'
import { getAllGeneros, getAllPaginas, getGlobalData } from '@/lib/cosmic'
import { Inter, Lexend_Peta, Lexend_Exa, Lexend } from 'next/font/google'


import "../styles/general.scss"


const inter = Inter({ subsets: ['latin'], variable: '--font-inter'})
const lexend_peta = Lexend_Peta({ subsets: ['latin'], variable: '--font-lexend-peta'})
const lexend_exa = Lexend_Exa({ subsets: ['latin'], variable: '--font-lexend-exa'})
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend'})

export async function generateMetadata() {
  const metaDataPrincipal = await getGlobalData()
  return {
    title: metaDataPrincipal.metadata.site_title,
    description: metaDataPrincipal.metadata.site_tag,
    icons: {
      icon: 'faviconestranho.png'
    }
  };
}




export default async function RootLayout({ children }) {

  const paginas = await getAllPaginas()
  const generos = await getAllGeneros()

  return (
    <>
      <html lang="en">
        <Body
          className={`${inter.variable} ${lexend_peta.variable} ${lexend_exa.variable} ${lexend.variable}`}
          paginas={paginas}
          dataFilters={generos}
        >
          {children}
        </Body>
      </html>
    </>
  )
}
