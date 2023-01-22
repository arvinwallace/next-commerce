import type { InferGetStaticPropsType } from "next"
import { Layout } from "@components/common"
import getAllProducts from "@framework/product/get-all-products"
import { getConfig } from "@framework/api/config"

export async function getStaticProps(){
  const config = getConfig()
  const products = await getAllProducts(config)
  return {
    props: {
      products
    },
    revalidate: 4 * 60 * 60
  }
}

export default function Home({
  products
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      "hello dudes"
      <pre style={{width: "80%", whiteSpace: "pre-wrap"}}>{JSON.stringify(products, null, 4)}</pre>
    </div>
  )
}

Home.Layout = Layout