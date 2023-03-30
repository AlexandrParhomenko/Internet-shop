import React from 'react';
import {
  selectAmountItemState,
  selectItemState,
} from "@/store/storeItems";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import sultan from '../../images/png/sultan.png'
import frame from '../../images/png/Frame 125.png'
import contact from '../../images/png/Group 100.png'
import download from '../../images/png/bx_bxs-download.png'

const Header = () => {
  const itemState = useSelector(selectItemState)
  const amount = useSelector(selectAmountItemState)
  const dispatch = useDispatch()

  const countPrice = () => {
    const ans = 0
    return ((itemState.reduce((acc, cur, idx) => acc + (amount[idx] * parseFloat(cur.price.split(' ')[0].replace(',', '.'))), ans).toFixed(2)) || 0) + ' ₸'
  }
  return (
      <div className='header'>
        <div className='header__first-block'>
          <div className='block-wrapper'>
            <div className='header__info location'>
              <span className='header__text'>г. Кокчетав, ул. Ж. Ташенова 129Б</span>
              <span className='header__bottom-text'>(Рынок Восточный)</span>
            </div>
            <div className='header__info mail'>
              <span className='header__text'>opt.sultan@mail.ru</span>
              <span className='header__bottom-text'>На связи в любое время</span>
            </div>
          </div>

          <nav className='nav'>
            <span className='nav__text border'>О компании</span>
            <span className='nav__text border'>Доставка и оплата</span>
            <span className='nav__text border'>Возврат</span>
            <span className='nav__text'>Контакты</span>
          </nav>
        </div>
        <div className='header__second-block'>
          <div className='header__second-block__container'>
            <img className='logo-padding' src={sultan.src} alt='sultan'/>
            <div className='yellow-btn'>
              <span className='header__text white'>Каталог</span>
              <img src={frame.src} alt='frame'/>
            </div>
            <div className='search-bar'>
              <span className='search-bar__text'>Поиск...</span>
              <div className='search-logo'></div>
            </div>
          </div>
          <div className='header__second-block__container'>
            <div className='contacts-block'>
              <span className='header__text'>+7 (777) 490-00-91</span>
              <span className='header__bottom-text'>время работы: 9:00-20:00</span>
              <span className='header__bottom-text'>Заказать звонок</span>
            </div>
            <img className='header-padding' src={contact.src} alt='contact'/>
            <div className='btn-border'>
              <div className='yellow-btn'>
                <span className='header__text white'>Прайс-лист</span>
                <img src={download.src} alt='frame'/>
              </div>
            </div>
            <div className='cart-wrapper'>
              <Link href='/cart'><div className='cart'></div></Link>
              <div className='cart-num header__text white'>{itemState.length}</div>
              <div className='cart__info'>
                <span className='header__bottom-text'>Корзина</span>
                <span className='header__text'>{countPrice()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
};

export default Header;
