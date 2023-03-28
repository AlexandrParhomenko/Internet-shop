import '@/styles/globals.scss'
import '../components/header/header.scss'
import '../components/main/main.scss'
import '../components/footer/footer.scss'
import type {AppProps} from 'next/app'
import {wrapper} from "@/store/store";
import {useEffect} from "react";
import {selectAmountItemState, selectItemState, setAmount, setItemState} from "@/store/storeItems";
import {useDispatch, useSelector} from "react-redux";

function App({Component, pageProps}: AppProps) {
  const itemState = useSelector(selectItemState)
  const amount = useSelector(selectAmountItemState)
  const dispatch = useDispatch()
  useEffect(() => {
    const localItemState = localStorage.getItem('itemState')
    const localAmount = localStorage.getItem('amount')

    dispatch(setItemState(JSON.parse(localItemState || '')))
    dispatch(setAmount(JSON.parse(localAmount || '')))
  }, [])

  if (process.browser) {
    window.onbeforeunload = () => {
      localStorage.setItem('amount', JSON.stringify(amount));
      localStorage.setItem('itemState', JSON.stringify(itemState));
    }
  }

  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);
