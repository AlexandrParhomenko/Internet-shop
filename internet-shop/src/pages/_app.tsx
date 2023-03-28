import '@/styles/globals.scss'
import '../components/header/header.scss'
import '../components/main/main.scss'
import '../components/footer/footer.scss'
import type {AppProps} from 'next/app'
import {wrapper} from "@/store/store";

function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);
