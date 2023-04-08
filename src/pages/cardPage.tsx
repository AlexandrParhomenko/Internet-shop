import React, {useState} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {
  selectAmountItemState,
  selectCurItemState,
  selectCartItemState, setAmount,
  setCartItemState
} from "@/store/storeItems";
import Link from "next/link";
import share from '../images/png/ci_share.png'
import download from '../images/png/downloaddark.png'
import image21 from '../images/png/image21.png'
import image22 from '../images/png/image22.png'
import image3 from '../images/png/image3.png'
import Image from "next/image";

const CardPage = () => {
  const [itemAmount, setItemAmount] = useState<number>(1)
  const itemState = useSelector(selectCartItemState)
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
          <span className='main__top-font grey navigation'>{curItemState.name}</span>
        </div>
        <div className='item-block'>

          <Image src={curItemState.img === `image21`
              ? image21 : curItemState.img === `image22`
                  ? image22 : image3} alt='img'/>
          <div className='item-block__description'>
            <span className='weight-font name-font green'>В наличии</span>
            <span className='item-block__name'>{curItemState.name}</span>
            <span className='weight-font'>{curItemState.weight}</span>
            <div className='item-block__price'>
              <span className='item-block__name'>{curItemState.price}</span>
              <div className='amount-wrapper'>
                <div  onClick={() => itemAmount != 1 ? setItemAmount(itemAmount - 1) : ''} className='amount'>-</div>
                <span>{itemState.some((ele) => ele.code === curItemState.code) ? 1 : itemAmount}</span>
                <div data-testid='increase-btn' onClick={() => setItemAmount(itemAmount + 1)} className='amount'>+</div>
              </div>
              <div data-testid='toCart-btn' onClick={() => {
                dispatch(setCartItemState([...itemState, curItemState]))
                dispatch(setAmount([...amount, itemAmount]))
              }} className={itemState.some(ele => ele.code === curItemState.code) ?  'yellow-btn header__text white cart-img active-cart' : 'yellow-btn header__text white cart-img'}>
                {itemState.some(ele => ele.code === curItemState.code) ?  'В корзине' : 'В корзину'}
              </div>

            </div>
            <div className='amount-wrapper cons'>
              <img className='white-btn navigation' src={share.src} alt='img'/>
              <div className='white-btn weight-font blue'>При покупке от <b>10 000 ₸</b> бесплатная<br/> доставка по Кокчетаву и области</div>
              <div className='white-btn center'>
                <span className='header__text'><b>Прайс-лист</b></span>
                <img src={download.src} alt='frame'/>
              </div>
            </div>
            <div>
              <span className='weight-font name-font'>Производитель: </span>
              <span className='description-font'><b>{curItemState.manufacturer}</b></span>
            </div>
            <div>
              <span className='weight-font name-font'>Бренд: </span>
              <span className='description-font'><b>{curItemState.brand}</b></span>
            </div>
            <div>
              <span className='weight-font name-font'>Штрихкод: </span>
              <span className='description-font'><b>{curItemState.code}</b></span>
            </div>
            <div>
              <span className='weight-font name-font'>Вес коробки: </span>
              <span className='description-font'><b>{curItemState.weight}</b></span>
            </div>
          </div>
        </div>
      <Footer/>
      </div>
  );
};

export default CardPage;
