import { getGlobalData } from "@/lib/cosmic";
import WrappedText from "../components/WrappedText"

/* export async function generateMetadata() {
  const siteData = await getGlobalData();
  return {
    title: siteData.metadata.site_title,
    description: siteData.metadata.site_tag,
  };
} */

export default async function Underground() {
  return (
    <main>
      <WrappedText classOn="underground"/>
    </main>
  )
}
