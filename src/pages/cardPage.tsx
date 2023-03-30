import React, {useState} from 'react';
import Header from "src/components/header/Header";
import Footer from "src/components/footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {
  selectAmountItemState,
  selectCurItemState,
  selectItemState, setAmount,
  setItemState
} from "src/store/storeItems";
import Link from "next/link";

const CardPage = () => {
  const [itemAmount, setItemAmount] = useState<number>(1)
  const itemState = useSelector(selectItemState)
  const curItemState = useSelector(selectCurItemState)
  const amount = useSelector(selectAmountItemState)
  const dispatch = useDispatch()



  return (
      <div>
      <Header/>
        <div className='main__nav margin'>
          <Link href='/'><span className='main__top-font dots navigation'>Главная</span></Link>
          <Link href='/'><span className='bold-text '>{`< Назад`}</span></Link>
          <span className='main__top-font dots navigation'>Каталог</span>
          <span className='main__top-font grey navigation'>{curItemState[0].name}</span>
        </div>
        <div className='item-block'>

          <img className='img' src={`/${curItemState[0].img}.png`} alt='img'/>
          <div className='item-block__description'>
            <span className='weight-font name-font green'>В наличии</span>
            <span className='item-block__name'>{curItemState[0].name}</span>
            <span className='weight-font'>{curItemState[0].weight}</span>
            <div className='item-block__price'>
              <span className='item-block__name'>{curItemState[0].price}</span>
              <div className='amount-wrapper'>
                <div onClick={() => itemAmount != 1 ? setItemAmount(itemAmount - 1) : ''} className='amount'>-</div>
                <span>{itemState.some((ele, idx) => ele.code === curItemState[0].code) ? 1 : itemAmount}</span>
                <div onClick={() => setItemAmount(itemAmount + 1)} className='amount'>+</div>
              </div>
              <div onClick={() => {
                dispatch(setItemState([...itemState, curItemState[0]]))
                dispatch(setAmount([...amount, itemAmount]))
              }} className={itemState.some(ele => ele.code === curItemState[0].code) ?  'yellow-btn header__text white cart-img active-cart' : 'yellow-btn header__text white cart-img'}>
                {itemState.some(ele => ele.code === curItemState[0].code) ?  'В корзине' : 'В корзину'}
              </div>

            </div>
            <div className='amount-wrapper cons'>
              <img className='white-btn navigation' src='/ci_share.png' alt='img'/>
              <div className='white-btn weight-font blue'>При покупке от <b>10 000 ₸</b> бесплатная<br/> доставка по Кокчетаву и области</div>
              <div className='white-btn center'>
                <span className='header__text'><b>Прайс-лист</b></span>
                <img src='/downloaddark.png' alt='frame'/>
              </div>
            </div>
            <div>
              <span className='weight-font name-font'>Производитель: </span>
              <span className='description-font'><b>{curItemState[0].manufacturer}</b></span>
            </div>
            <div>
              <span className='weight-font name-font'>Бренд: </span>
              <span className='description-font'><b>{curItemState[0].brand}</b></span>
            </div>
            <div>
              <span className='weight-font name-font'>Штрихкод: </span>
              <span className='description-font'><b>{curItemState[0].code}</b></span>
            </div>
            <div>
              <span className='weight-font name-font'>Вес коробки: </span>
              <span className='description-font'><b>{curItemState[0].weight}</b></span>
            </div>
          </div>
        </div>
      <Footer/>
      </div>
  );
};

export default CardPage;
