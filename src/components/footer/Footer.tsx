import React from 'react';

const Footer = () => {
  return (
      <div className='footer'>
        <div className='footer__logo-block'>
          <img src='/sultanwhite.png' height='66' width='156' alt='sultan'/>
          <span style={{paddingTop: '15px', paddingBottom: '45px'}} className='footer__text'>{`Компания «Султан» — снабжаем розничные магазины товарами<br/> "под ключ" в Кокчетаве и Акмолинской области`}</span>
          <span style={{paddingBottom: '15px'}} className='footer__text small'>Подпишись на скидки и акции</span>
          <div className='email-wrapper'>
            <div>Введите ваш E-mail</div>
            <div className='arrow-wrapper'></div>
          </div>
        </div>
        <div className='menu-wrapper'>
          <span className='general-font'>Меню сайта:</span>
          <span className='footer__text medium'>О компании</span>
          <span className='footer__text medium'>Доставка и оплата</span>
          <span className='footer__text medium'>Возврат</span>
          <span className='footer__text medium'>Контакты</span>
        </div>
        <div className='menu-wrapper'>
          <span className='general-font'>Категории:</span>
          <span className='footer__text medium'>Бытовая химия</span>
          <span className='footer__text medium'>Косметика и гигиена</span>
          <span className='footer__text medium'>Товары для дома</span>
          <span className='footer__text medium'>Товары для детей и мам</span>
          <span className='footer__text medium'>Посуда</span>
        </div>
        <div className='menu-wrapper'>
          <span className='general-font'>Скачать прайс-лист:</span>
          <div className='yellow-btn'>
            <span className='footer__text'>Прайс-лист</span>
            <img src='/bx_bxs-download.png' alt='frame'/>
          </div>
          <span className='footer__text medium'>Связь в мессенджерах:</span>
          <div className='social-wrapper'>
            <img src='/Group%20162.png' height='39' width='39' alt='social'/>
            <img src='/logos_telegram.png' height='39' width='39' alt='social'/>
          </div>
        </div>
        <div className='contact-wrapper'>
          <span className='general-font'>Контакты:</span>
          <div className='contact-wrapper__block'>
            <span className='general-font medium'>+7 (777) 490-00-91</span>
            <span className='footer__text small'>время работы: 9:00-20:00</span>
            <span className='footer__text underline'>Заказать звонок</span>
          </div>
          <div className='contact-wrapper__mail'>
            <span className='general-font medium'>opt.sultan@mail.ru</span>
            <span className='footer__text small'>На связи в любое время</span>
          </div>
          <div className='social-wrapper'>
            <img src='/Visa.png' height='39' width='61' alt='social'/>
            <img src='/Visa%20(1).png' height='39' width='61' alt='social'/>
          </div>
        </div>

      </div>
  );
};

export default Footer;
