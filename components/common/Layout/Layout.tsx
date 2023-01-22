import { FC } from "react"
import style from "./Layout.module.css"

interface Props {
  children: React.ReactNode;
}

const Layout:FC<Props> = ({children}) => {
  return (
    <div className={style.root}>
      <main className="fit">
        {children}
      </main>
    </div>
  )
}

export default Layout