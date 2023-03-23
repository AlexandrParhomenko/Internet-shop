import React from 'react';

const Header = () => {
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
          <img className='logo-padding' src='/sultan.png' alt='sultan'/>
          <div className='yellow-btn'>
            <span className='header__text white'>Каталог</span>
            <img src='/Frame%20125.png' alt='frame'/>
          </div>
          <div className='search-bar'>
            <span className='search-bar__text'>Поиск...</span>
            <div className='search-logo'></div>
          </div>
          <div className='contacts-block'>
            <span className='header__text'>+7 (777) 490-00-91</span>
            <span className='header__bottom-text'>время работы: 9:00-20:00</span>
            <span className='header__bottom-text'>Заказать звонок</span>
          </div>
          <img className='header-padding' src='/Group%20100.png' alt='contact'/>
          <div className='btn-border'>
            <div className='yellow-btn'>
              <span className='header__text white'>Прайс-лист</span>
              <img src='/bx_bxs-download.png' alt='frame'/>
            </div>
          </div>
          <div className='cart-wrapper'>
            <div className='cart header__text white'></div>
            <div className='cart__info'>
              <span className='header__bottom-text'>Корзина</span>
              <span className='header__text'>12 478 ₸</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Header;
