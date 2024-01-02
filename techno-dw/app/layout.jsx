import Body from './body'
import { getGlobalData } from '@/lib/cosmic'

import main from "../styles/modules/main.module.scss"
import "../styles/general.scss"

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
        <Body className={main.body}>
          {children}
        </Body>
      </html>
    </>
  )
}
