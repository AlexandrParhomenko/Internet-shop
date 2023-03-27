import React, {useEffect, useState} from 'react';
import data from '../../data.json';
import {type} from "os";


const Main = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(10000)
  const [manuSearch, setManuSearch] = useState<string>('')
  const [manuFilter, setManuFilter] = useState<string[]>([])
  const [brandSearch, setBrandSearch] = useState<string>('')
  const [brandFilter, setBrandFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [sortSelect, setSortSelect] = useState<number>(0)
  const [itemsList, setItemsList] = useState<dataItem[]>([...data.products.items])
  const [filteredList, setFilteredList] = useState<dataItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [itemWindow, setItemWindow] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<dataItem>(itemsList[0]);
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

  interface dataItem {
    img: string;
    manufacturer: string;
    weight: string;
    name: string;
    code: string;
    brand: string;
    price: string;
    careType: string[];
  }

  const getManufacturers = () => {
    let arr: string[] = data.products.items.map(el => el.manufacturer)
    return Array.from(new Set(arr))
  }

  const getBrands = () => {
    let arr: string[] = data.products.items.map(el => el.brand)
    return Array.from(new Set(arr))
  }


  const checkboxHandler = (el: string) => {
    if (manuFilter.indexOf(el) === -1) {
      setManuFilter([...manuFilter, el])
    } else {
      let arr = [...manuFilter]
      arr.splice(arr.indexOf(el), 1)
      setManuFilter(arr);
    }
  }

  const brandCheckboxHandler = (el: string) => {
    if (brandFilter.indexOf(el) === -1) {
      setBrandFilter([...brandFilter, el])
    } else {
      let arr = [...brandFilter]
      arr.splice(arr.indexOf(el), 1)
      setBrandFilter(arr);
    }
  }

  const removeFilters = () => {
    setMinPrice(0)
    setMaxPrice(10000)
    setManuFilter([])
    setManuSearch('')
    setBrandFilter([])
    setBrandSearch('')
    setSortSelect(0)
  }


  const activeHandler = (el: string) => {
    if (typeFilter.indexOf(el) === -1) {
      setTypeFilter([...typeFilter, el])
    } else {
      let arr = [...typeFilter]
      arr.splice(arr.indexOf(el), 1)
      setTypeFilter(arr)
    }
  }

  const cardWindowHandle = (el: dataItem) => {
    console.log(123)
    setItemWindow(!itemWindow);
    setCurrentItem(el)
  }


  const searchHandle = () => {
    return manuSearch.length !== 0 ?
        getManufacturers().map((el, idx) => {
          if (el.toLowerCase().includes(manuSearch.toLowerCase()))
            return <div key={idx} className='checkbox-wrapper'>
              <input className={el} onChange={() => checkboxHandler(el)} type='checkbox'/>
              <span className='weight-font name-font'>{el}</span>
            </div>
        }) : getManufacturers().map((el, idx) =>
            <div key={idx} className='checkbox-wrapper'>
              <input onChange={() => checkboxHandler(el)} type='checkbox'/>
              <span className='weight-font name-font'>{el}</span>
            </div>)
  }

  const searchBrandsHandle = () => {
    return brandSearch.length !== 0 ?
        getBrands().map((el, idx) => {
          if (el.toLowerCase().includes(brandSearch.toLowerCase()))
            return <div key={idx} className='checkbox-wrapper'>
              <input className={el} onChange={() => brandCheckboxHandler(el)} type='checkbox'/>
              <span className='weight-font name-font'>{el}</span>
            </div>
        }) : getBrands().map((el, idx) =>
            <div key={idx} className='checkbox-wrapper'>
              <input onChange={() => brandCheckboxHandler(el)} type='checkbox'/>
              <span className='weight-font name-font'>{el}</span>
            </div>)
  }

  const setSort = () => {
    if (sortSelect === 0) return '(a, b) => a.name > b.name ? 1 : -1'
    if (sortSelect === 1) return '(a, b) => a.name > b.name ? -1 : 1'
    if (sortSelect === 2) return '(a, b) => parseInt(a.price.split(" ")[0]) > parseInt(b.price.split(" ")[0]) ? -1 : 1'
    if (sortSelect === 3) return '(a, b) => parseInt(b.price.split(" ")[0]) > parseInt(a.price.split(" ")[0]) ? -1 : 1'
  }

  const filterHandle = () => {
    let t = 0
    return showFilter ? itemsList.sort(eval(setSort()!)).map((el, idx) => {
      if (parseInt(el.price.split(' ')[0]) > minPrice && parseInt(el.price.split(' ')[0]) < maxPrice) {
        if ((el.careType ? el.careType.some(el => typeFilter.indexOf(el) !== -1) : '') || typeFilter.length === 0) {
          if ((manuFilter.indexOf(el.manufacturer) !== -1) ||
              (brandFilter.indexOf(el.brand) !== -1) ||
              (manuFilter.indexOf(el.manufacturer) !== -1 && brandFilter.length === 0) ||
              (brandFilter.indexOf(el.brand) !== -1 && manuFilter.length === 0)) {
            t++
            if ((idx >= page * 9 - 9 && idx < page * 9 && t > 9) || (t < 9 && page === 1)) {
              return <div key={idx} className='shop-items__container__item'>
                <div className='img-wrapper'>
                  <img src={`/${el.img}.png`} alt='img'/>
                </div>
                <div></div>
                <span className='weight-font'>{el.weight}</span>
                <span onClick={() => cardWindowHandle(el)} className='main-text'>{el.name}</span>
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
          }
        }
      }
    }) : itemsList.sort(eval(setSort()!)).map((el, idx) => {
      if (idx >= page * 9 - 9 && idx < page * 9)
        return <div key={idx} className='shop-items__container__item'>
          <div className='img-wrapper'>
            <img src={`/${el.img}.png`} alt='img'/>
          </div>
          <span className='weight-font'>{el.weight}</span>
          <span onClick={() => cardWindowHandle(el)} className='main-text'>{el.name}</span>
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
    })
  }

  return (
      <div className='main'>
        {!itemWindow ? <div className='main__nav'>
          <span className='main__top-font dots'>Главная</span>
          <span className='main__top-font grey'>Косметика и гигиена</span>
        </div> :
            <div className='main__nav'>
              <span onClick={() => setItemWindow(!itemWindow)} className='main__top-font dots'>Главная</span>
              <span onClick={() => setItemWindow(!itemWindow)} className='main__top-font dots'>Каталог</span>
              <span className='main__top-font grey'>{currentItem.name}</span>
            </div>}

        {!itemWindow ? <div className='main__content'>
              <div className='sort-wrapper'>
                <span className='main__content__title'>Косметика и гигиена</span>
                <div>
                  <span className='sort-font'>Сортировка: </span>
                  <select onChange={(e) => setSortSelect(parseInt(e.target.value))} className='select'>
                    <option value='0'>По названию(А-Я)</option>
                    <option value='1'>По названию(Я-А)</option>
                    <option value='2'>Сначала дорогие</option>
                    <option value='3'>Сначала недорогие</option>
                  </select>
                </div>
              </div>
              <div className='sort-types'>
                {headersArray.map((el, idx) => <div key={idx} onClick={() => activeHandler(el)}
                                                    className={typeFilter.indexOf(el) !== -1 ? 'sort-types__item weight-font name-font active' : 'sort-types__item weight-font name-font'}>{el}</div>)}
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
                  <div>
                    <span className='aside-filters__title'>Бренд</span>
                    <div style={{margin: 0}} className='search-bar'>
                      <input type='text' value={brandSearch}
                             onChange={(e) => setBrandSearch(e.target.value)} placeholder='Поиск...'
                             className='search-bar__text search-input'/>
                      <div className='search-logo'></div>
                    </div>
                    <div className='checkbox-container'>
                      {searchBrandsHandle()}
                    </div>
                  </div>
                  <div className='filters-block'>
                    <div onClick={() => setShowFilter(true)} className='yellow-btn'>
                      <span className='footer__text'>Показать</span>
                    </div>
                    <div onClick={() => removeFilters()} className='delete-block'></div>
                  </div>
                  {headersArray.map((el, idx) => <div key={idx} onClick={() => activeHandler(el)}
                                                      className={typeFilter.indexOf(el) !== -1 ? 'aside-filters__header active' : 'aside-filters__header'}>{el}</div>)}
                </div>
                <div className='shop-items__container'>
                  {filterHandle()}
                </div>
              </div>
              <div className='pagination-wrapper'>
                <span onClick={() => setPage(page !== 1 ? page - 1 : page)}>{'<'}</span>
                <div className='page'>{page}</div>
                <span
                    onClick={() => setPage((page + 1) * 9 - 9 > itemsList.length ? page : page + 1)}>{'>'}</span>
              </div>
            </div> :
            <div className='item-block'>
              <img src={`/${currentItem.img}.png`} height='400' width='200' alt='img'/>
              <div className='item-block__description'>
                <span className='weight-font name-font green'>В наличии</span>
                <span className='item-block__name'>{currentItem.name}</span>
                <span className='weight-font'>{currentItem.weight}</span>
                <div className='item-block__price'>
                  <span className='item-block__name'>{currentItem.price}</span>
                  <div className='amount-wrapper'>
                    <div className='amount'>-</div>
                    <span>1</span>
                    <div className='amount'>+</div>
                  </div>
                  <div className='yellow-btn'>
                    <span className='header__text white'>В корзину</span>
                    <img src='/whitecart.png' alt='frame'/>
                  </div>

                </div>
                <div className='amount-wrapper'>
                  <img className='white-btn' src='/ci_share.png' alt='img'/>
                  <div className='white-btn weight-font blue'>При покупке от <b>10 000 ₸</b> бесплатная<br/> доставка по Кокчетаву и области</div>
                  <div className='white-btn center'>
                    <span className='header__text'><b>Прайс-лист</b></span>
                    <img src='/downloaddark.png' alt='frame'/>
                  </div>
                </div>
                <div>
                  <span className='weight-font name-font'>Производитель: </span>
                  <span className='description-font'><b>{currentItem.manufacturer}</b></span>
                </div>
                <div>
                  <span className='weight-font name-font'>Бренд: </span>
                  <span className='description-font'><b>{currentItem.brand}</b></span>
                </div>
                <div>
                  <span className='weight-font name-font'>Штрихкод: </span>
                  <span className='description-font'><b>{currentItem.code}</b></span>
                </div>
                <div>
                  <span className='weight-font name-font'>Вес коробки: </span>
                  <span className='description-font'><b>{currentItem.weight}</b></span>
                </div>
              </div>
            </div>}
      </div>
  );
};

export default Main;
