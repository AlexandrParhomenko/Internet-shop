import React, {useState} from 'react';
import data from '../../data.json';


const Main = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(10000)
  const [manuSearch, setManuSearch] = useState<string>('')
  const [manuFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const headersArray: string[] = [
    'Уход за руками',
    'Уход за ногами',
    'Уход за лицом',
    'Уход за волосами',
    'Средства для загара',
    'Средства для бритья',
    'Подарочные наборы',
    'Гигиеническая продукция',
    'Гигиена полости рта',
    'Бумажная продукция'
  ]

  const getManufacturers = () => {
    let arr: string[] = data.products.items.map(el => el.manufacturer)
    return Array.from(new Set(arr))
  }

  const checkboxHandler = (el: string) => {
    manuFilter.indexOf(el) === -1 ? manuFilter.push(el) : manuFilter.splice(manuFilter.indexOf(el), 1)
  }

  const removeFilters = () => {
    setMinPrice(0)
    setMaxPrice(10000)
    setManuSearch('')
    console.log(typeFilter)
  }

  const addActive = (el: string) => {
    return typeFilter.indexOf(el) !== -1 ? 'sort-types__item weight-font name-font active' : 'sort-types__item weight-font name-font'
  }

  const activeHandler = (e: string) => {
    typeFilter.indexOf(e) === -1 ? setTypeFilter([...typeFilter, e]) : console.log(typeFilter.splice(typeFilter.indexOf(e), 1))
    console.log(typeFilter)
  }
  const addActive2 = (el: string) => {return typeFilter.indexOf(el) !== -1 ? 'aside-filters__header active' : 'aside-filters__header'}

  const searchHandle = () => {
    return manuSearch.length !== 0 ?
        getManufacturers().map(el => {
          if (el.toLowerCase().includes(manuSearch.toLowerCase()))
            return <div className='checkbox-wrapper'>
              <input className={el} onChange={() => checkboxHandler(el)} type='checkbox'/>
              <span className='weight-font name-font'>{el}</span>
            </div>
        }) : getManufacturers().map(el =>
            <div className='checkbox-wrapper'>
              <input onChange={() => checkboxHandler(el)} type='checkbox'/>
              <span className='weight-font name-font'>{el}</span>
            </div>)
  }


  const filterHandle = () => {
    return showFilter ? data.products.items.map(el => {
      if (parseInt(el.price.split(' ')[0]) > minPrice && parseInt(el.price.split(' ')[0]) < maxPrice) {
        return <div className='shop-items__container__item'>
          <div className='img-wrapper'>
            <img src={`/${el.img}.png`} alt='img'/>
          </div>
          <div></div>
          <span className='weight-font'>{el.weight}</span>
          <span className='main-text'>{el.name}</span>
          <div>
            <span className='weight-font name-font'>Штрихкод: </span>
            <span className='description-font'>{el.code}</span>
          </div>
          <div>
            <span className='weight-font name-font'>Производитель: </span>
            <span className='description-font'>{el.manufacturer}</span>
          </div>
          <div>
            <span className='weight-font name-font'>Брэнд: </span>
            <span className='description-font'>{el.brand}</span>
          </div>
          <div className='price-wrapper'>
            <span className='main-text price-font'>{el.price}</span>
            <div className='cart-btn'>в корзину</div>
          </div>
        </div>
      }
    }) : data.products.items.map(el =>
        <div className='shop-items__container__item'>
          <div className='img-wrapper'>
            <img src={`/${el.img}.png`} alt='img'/>
          </div>
          <div></div>
          <span className='weight-font'>{el.weight}</span>
          <span className='main-text'>{el.name}</span>
          <div>
            <span className='weight-font name-font'>Штрихкод: </span>
            <span className='description-font'>{el.code}</span>
          </div>
          <div>
            <span className='weight-font name-font'>Производитель: </span>
            <span className='description-font'>{el.manufacturer}</span>
          </div>
          <div>
            <span className='weight-font name-font'>Брэнд: </span>
            <span className='description-font'>{el.brand}</span>
          </div>
          <div className='price-wrapper'>
            <span className='main-text price-font'>{el.price}</span>
            <div className='cart-btn'>в корзину</div>
          </div>
        </div>)
  }

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
            {headersArray.map(e => <div onClick={() => activeHandler(e)} className={addActive(e)}>{e}</div>)}
          </div>
          <div className='shop-items'>
            <div className='aside-filters'>
              <div className='price-filter'>
                <span className='aside-filters__title'>ПОДБОР ПО ПАРАМЕТРАМ</span>
                <span>Цена ₸</span>
                <div className='input-wrapper'>
                  <input value={minPrice}
                         onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                         className='input' type='text'/>
                  <span>-</span>
                  <input value={maxPrice}
                         onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
                         className='input' type='text'/>
                </div>
              </div>
              <div>
                <span className='aside-filters__title'>Производитель</span>
                <div style={{margin: 0}} className='search-bar'>
                  <input type='text' value={manuSearch}
                         onChange={(e) => setManuSearch(e.target.value)} placeholder='Поиск...'
                         className='search-bar__text search-input'/>
                  <div className='search-logo'></div>
                </div>
                <div className='checkbox-container'>
                  {searchHandle()}
                </div>
              </div>
              <div className='filters-block'>
                <div onClick={() => setShowFilter(true)} className='yellow-btn'>
                  <span className='footer__text'>Показать</span>
                </div>
                <div onClick={() => removeFilters()} className='delete-block'></div>
              </div>
              {headersArray.map(e => <div onClick={() => typeFilter.push(e)} className={addActive2(e)}>{e}</div>)}
            </div>
            <div className='shop-items__container'>
              {filterHandle()}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Main;
