import 'src/styles/globals.scss'
import '../components/header/header.scss'
import '../components/main/main.scss'
import '../components/footer/footer.scss'
import type {AppProps} from 'next/app'
import {wrapper} from "@/store/store";
import {useEffect} from "react";
import {setAmount, setCartItemState} from "@/store/storeItems";
import {useDispatch} from "react-redux";

function App({Component, pageProps}: AppProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    const localItemState = localStorage.getItem('itemState')
    const localAmount = localStorage.getItem('amount')
    if (localItemState) {
      dispatch(setCartItemState(JSON.parse(localItemState)))
    }
    if (localAmount) {
      dispatch(setAmount(JSON.parse(localAmount)))
    }
  }, [])
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);
