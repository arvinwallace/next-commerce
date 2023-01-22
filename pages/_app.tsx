import { AppProps } from "next/app"
import "@assets/main.css"
import { FC } from "react"

interface Props {
  children: React.ReactNode;
}

const NOOP:FC<Props> = ({children}) => <>{children}</>

function MyApp({Component, pageProps}:AppProps & {Component: {Layout: FC<Props>}}){

  const Layout = Component?.Layout ?? NOOP
  return (
    <Layout>
        <Component {...pageProps}/>
    </Layout>
  )
}

export default MyApp