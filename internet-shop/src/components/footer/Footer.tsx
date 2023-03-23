import React from 'react';

const Footer = () => {
  return (
      <div className='footer'>
        <div className='footer__logo-block'>
          <img src='/sultanwhite.png' height='66' width='156' alt='sultan'/>
          <span className='footer__text'>Компания «Султан» — снабжаем розничные магазины товарами "под ключ" в Кокчетаве и Акмолинской области</span>
          <span>Подпишись на скидки и акции</span>
          <div>
            <span>Введите ваш E-mail</span>
            <div></div>
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
  );
};

export default Footer;
