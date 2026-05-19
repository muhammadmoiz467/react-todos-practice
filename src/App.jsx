import "./App.scss"
import "bootstrap/dist/js/bootstrap.bundle"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button, ConfigProvider } from "antd"

import Routes from "./pages/Routes"

const App = () => {
  return (
    <>
    <ConfigProvider theme={{ token:{ colorPrimary: "#1d3557 "}, components: { Button: { controlOutlineWidth: 0 } } }}>
     <Routes />
    </ConfigProvider>
    </>
  )
}

export default App