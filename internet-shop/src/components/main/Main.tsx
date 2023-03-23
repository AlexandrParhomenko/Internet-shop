import React from 'react';

const Main = () => {
  return (
      <div className='main'>
        <div className='main__nav'>
          <span className='main__top-font dots'>Главная</span>
          <span className='main__top-font grey'>Косметика и гигиена</span>
        </div>
        <div className='main__content'>
          <div className='sort-wrapper'>
            <span className='main__content__title'>Косметика и гигиена</span>
            <div>
              <span className='sort-font'>Сортировка: </span>
              <select className='select'>
                <option value='0'>По названию(А-Я)</option>
                <option value='1'>По названию(Я-А)</option>
                <option value='2'>Сначала дорогие</option>
                <option value='3'>Сначала недорогие</option>
              </select>
            </div>
          </div>
          <div className='sort-types'>
            <div className='sort-types__item'>Уход за телом</div>
            <div className='sort-types__item'>Уход за руками</div>
            <div className='sort-types__item'>Уход за ногами</div>
            <div className='sort-types__item'>Уход за лицом</div>
            <div className='sort-types__item'>Уход за волосами</div>
            <div className='sort-types__item'>Средства для загара</div>
            <div className='sort-types__item'>Средства для бритья</div>
            <div className='sort-types__item'>Подарочные наборы</div>
            <div className='sort-types__item'>Гигиеническая продукция</div>
            <div className='sort-types__item'>Гигиена полости рта</div>
            <div className='sort-types__item'>Бумажная продукция</div>
          </div>
          <div className='shop-items'>
            <div className='aside-filters'>
              <div className='price-filter'>
                <span className='aside-filters__title'>ПОДБОР ПО ПАРАМЕТРАМ</span>
                <span>Цена ₸</span>
                <div className='input-wrapper'>
                  <input value='0' className='input' type='text'/>
                  <span>-</span>
                  <input value='10000' className='input' type='text'/>
                </div>
              </div>
              <div>
                <span className='aside-filters__title'>Производитель</span>
                <div style={{margin: 0}} className='search-bar'>
                  <input type='text' placeholder='Поиск...' className='search-bar__text search-input'/>
                  <div className='search-logo'></div>
                </div>
                <div>
                  <div>
                    <input type='checkbox'/>
                    <span className=''>Manufacturer (58)</span>
                  </div>
                </div>
              </div>
              <div className='aside-filters__header'>Уход за телом</div>
              <div className='aside-filters__header'>Уход за руками</div>
              <div className='aside-filters__header'>Уход за ногами</div>
              <div className='aside-filters__header'>Уход за лицом</div>
              <div className='aside-filters__header'>Уход за волосами</div>
              <div className='aside-filters__header'>Средства для загара</div>
              <div className='aside-filters__header'>Средства для бритья</div>
              <div className='aside-filters__header'>Подарочные наборы</div>
              <div className='aside-filters__header'>Гигиеническая продукция</div>
              <div className='aside-filters__header'>Гигиена полости рта</div>
              <div className='aside-filters__header'>Бумажная продукция</div>
            </div>
            <div className='shop-items__container'>
              <div className='shop-items__container__item'>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Main;
