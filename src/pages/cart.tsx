import React, {useState} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useSelector, useDispatch} from "react-redux";
import {selectAmountItemState, selectItemState, setAmount, setItemState} from "@/store/storeItems";
import Link from "next/link";

const Cart = () => {

  if (process.browser) {
    window.onbeforeunload = () => {
      localStorage.setItem('amount', JSON.stringify(amount));
      localStorage.setItem('itemState', JSON.stringify(itemState));
    }
  }

  const itemState = useSelector(selectItemState)
  const dispatch = useDispatch()
  const [orderComplete, setOrderComplete] = useState<boolean>(false)
  const amount = useSelector(selectAmountItemState)

  const handleDelete = (idx: number) => {
    const arr = [...itemState]
    const amountArr = [...amount]
    arr.splice(idx, 1)
    amountArr.splice(idx, 1)
    dispatch(setAmount(amountArr))
    dispatch(setItemState(arr))
  }

  const countPrice = () => {
    const ans = 0
    return itemState.reduce((acc, cur, idx) => acc + (amount[idx] * parseFloat(cur.price.split(' ')[0].replace(',', '.'))), ans).toFixed(2) + ' ₸'
  }

  const claimOrder = () => {
    if (itemState.length !== 0) {
      setOrderComplete(true);
      dispatch(setItemState([]))
      dispatch(setAmount([]))
    }
  }

  const handleAmount = (idx: number) => {
    const arr = [...amount]
    arr[idx] += 1
    dispatch(setAmount(arr))
  }

  const handleDecrease = (idx: number) => {
    if (amount[idx] !== 1) {
      const arr = [...amount]
      arr[idx] -= 1;
      dispatch(setAmount(arr))
    }
  }

  return (
      <div>
        <Header/>
        <div className='main__nav margin'>
          <Link href='/'><span className='main__top-font dots'>Главная</span></Link>
          <span className='main__top-font grey'>Корзина</span>
        </div>
        {!orderComplete ? <div className='cart-wrap'>
          {itemState.map((el, idx) =>
              <div key={idx} className='cart-wrap__item'>
                <div style={{width: 200, display: 'flex', justifyContent: 'center'}}>
                  <img src={`/${el.img}.png`} alt='img'/>
                </div>
                <div className='cart-name'>
                  <span className='weight-font'>{el.weight}</span>
                  <span className='item-block__name'>{el.name}</span>
                </div>
                <div className='cart-amount-wrapper'>
                  <div className='amount-wrapper'>
                    <div onClick={() => handleDecrease(idx)}
                         className='amount'>-
                    </div>
                    <span className='main-text'>{amount[idx]}</span>
                    <div onClick={() => handleAmount(idx)} className='amount'>+</div>
                  </div>
                  <span
                      className='item-block__name'>{`${(amount[idx] * parseFloat(el.price.split(' ')[0].replace(',', '.'))).toFixed(2)} ₸`}</span>
                  <div onClick={() => handleDelete(idx)} className='page'>
                    <img src='/delete.png' alt='img'/>
                  </div>
                </div>
              </div>)}
          <div className='order-wrapper'>
            <div onClick={() => claimOrder()} className='yellow-btn header__text white'>Оформить
              заказ
            </div>
            <span className='item-block__name'>{countPrice()}</span>
          </div>
        </div> : <div className='order-ending-wrapper item-block__name'>Спасибо за заказ!</div>}
        <Footer/>
      </div>
  );
};

export default Cart;
