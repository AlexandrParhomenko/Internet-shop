import React from 'react';
import visa from '../../images/png/mastercard.png'
import visa2 from '../../images/png/Visa.png'
import telegram from '../../images/png/logos_telegram.png'
import whatsapp from '../../images/png/whatsapp.png'
import sultan from '../../images/png/sultanwhite.png'
import download from '../../images/png/bx_bxs-download.png'


const Footer = () => {
  return (
      <div className='footer'>
        <div className='footer__logo-block'>
          <img src={sultan.src} height='66' width='156' alt='sultan'/>
          <span style={{paddingTop: '15px', paddingBottom: '45px'}} className='footer__text'>{`Компания «Султан» — снабжаем розничные магазины товарами<br/> "под ключ" в Кокчетаве и Акмолинской области`}</span>
          <span style={{paddingBottom: '15px'}} className='footer__text small'>Подпишись на скидки и акции</span>
          <div className='email-wrapper'>
            <div>Введите ваш E-mail</div>
            <div className='arrow-wrapper'></div>
          </div>
        </div>
        <div className='menu-wrapper'>
          <span className='bold-font'>Меню сайта:</span>
          <span className='footer__text medium-font'>О компании</span>
          <span className='footer__text medium-font'>Доставка и оплата</span>
          <span className='footer__text medium-font'>Возврат</span>
          <span className='footer__text medium-font'>Контакты</span>
        </div>
        <div className='menu-wrapper'>
          <span className='bold-font'>Категории:</span>
          <span className='footer__text medium-font'>Бытовая химия</span>
          <span className='footer__text medium-font'>Косметика и гигиена</span>
          <span className='footer__text medium-font'>Товары для дома</span>
          <span className='footer__text medium-font'>Товары для детей и мам</span>
          <span className='footer__text medium-font'>Посуда</span>
        </div>
        <div className='menu-wrapper'>
          <span className='bold-font'>Скачать прайс-лист:</span>
          <div className='yellow-btn'>
            <span className='footer__text'>Прайс-лист</span>
            <img src={download.src} alt='frame'/>
          </div>
          <span className='footer__text medium-font'>Связь в мессенджерах:</span>
          <div className='social-wrapper'>
            <img src={whatsapp.src} height='39' width='39' alt='social'/>
            <img src={telegram.src} height='39' width='39' alt='social'/>
          </div>
        </div>
        <div className='contact-wrapper'>
          <span className='bold-font'>Контакты:</span>
          <div className='contact-wrapper__block'>
            <span className='bold-font medium-font'>+7 (777) 490-00-91</span>
            <span className='footer__text small'>время работы: 9:00-20:00</span>
            <span className='footer__text underline'>Заказать звонок</span>
          </div>
          <div className='contact-wrapper__mail'>
            <span className='bold-font medium-font'>opt.sultan@mail.ru</span>
            <span className='footer__text small'>На связи в любое время</span>
          </div>
          <div className='social-wrapper'>
            <img src={visa2.src} height='39' width='61' alt='social'/>
            <img src={visa.src} height='39' width='61' alt='social'/>
          </div>
        </div>

      </div>
  );
};

export default Footer;
