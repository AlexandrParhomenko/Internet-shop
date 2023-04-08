import React, {useEffect, useState} from 'react';
import data from '../../data.json';
import {
  selectAmountItemState,
  selectCartItemState,
  setCurItemState,
  setCartItemState,
  setAmount
} from "@/store/storeItems";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import Image from "next/image";
import image21 from '../../images/png/image21.png'
import image22 from '../../images/png/image22.png'
import image3 from '../../images/png/image3.png'

const Main = () => {

  const [addImg, setAddImg] = useState<string>('')
  const [addCode, setAddCode] = useState<string>('')
  const [addBrand, setAddBrand] = useState<string>('')
  const [addPrice, setAddPrice] = useState<string>('')
  const [addWeight, setAddWeight] = useState<string>('')
  const [addManufacturer, setAddManufacturer] = useState<string>('')
  const [addName, setAddName] = useState<string>('')
  const [addTypeFilter, setAddTypeFilter] = useState<string[]>([])
  const [edit, setEdit] = useState<number>()
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
  const [page, setPage] = useState<number>(1)
  const [itemWindow, setItemWindow] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<dataItem>(itemsList[0]);
  const [admin, setAdmin] = useState<boolean>(false)
  const [refactor, setRefactor] = useState<boolean>(false)
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
  useEffect(() => {
    const localItemsList = localStorage.getItem('itemsList')
    if (localItemsList) {
      setItemsList(JSON.parse(localItemsList).length === 0 ? [...data.products.items] : JSON.parse(localItemsList))
    }
  }, [])

  if (process.browser) {
    window.onbeforeunload = () => {
      localStorage.setItem('itemsList', JSON.stringify(itemsList));
      localStorage.setItem('amount', JSON.stringify(amount));
      localStorage.setItem('itemState', JSON.stringify(itemState));
    }
  }
  const itemState = useSelector(selectCartItemState)
  const amount = useSelector(selectAmountItemState)
  const dispatch = useDispatch()


  const getManufacturers = () => {
    let arr: string[] = data.products.items.map(el => el.manufacturer)
    return Array.from(new Set(arr))
  }

  const editHandle = (idx: number) => {
    const elem: dataItem = {...itemsList[0]}
    const arr = [...itemsList]
    arr.splice(idx, 1)
    elem.img = addImg;
    elem.name = addName;
    elem.brand = addBrand
    elem.code = addCode
    elem.price = `${addPrice} ₸`
    elem.careType = addTypeFilter
    elem.manufacturer = addManufacturer
    elem.weight = addWeight
    arr.splice(idx, 0, elem)
    setItemsList(arr)
    setEdit(-1)
  }

  const submitHandle = () => {
    const el: dataItem = {...itemsList[0]}
    if (addBrand.length !== 0 && addManufacturer.length !== 0 && addImg.length !== 0 && addName.length !== 0 && addCode.length !== 0 && addPrice.length !== 0) {
      el.img = addImg;
      el.name = addName;
      el.brand = addBrand
      el.code = addCode
      el.price = `${addPrice} ₸`
      el.careType = addTypeFilter
      el.manufacturer = addManufacturer
      el.weight = addWeight
      setItemsList([...itemsList, el])
      setRefactor(false)
      setAddTypeFilter([])
      setAddImg('')
      setAddName('')
      setAddCode('')
      setAddPrice('')
      setAddManufacturer('')
      setAddWeight('')
      setAddBrand('')
    }
  }

  const handleDelete = (idx: number) => {
    let arr = [...itemsList]
    arr.splice(idx, 1)
    setItemsList(arr)
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
    setTypeFilter([])
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
              <input data-testid={`${idx}-box`} onChange={() => checkboxHandler(el)} type='checkbox'/>
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
              (brandFilter.indexOf(el.brand) !== -1 && manuFilter.length === 0) ||
              (manuFilter.length === 0 && brandFilter.length === 0)) {
            t++
            if ((idx >= page * 9 - 9 && idx < page * 9 && t > 9) || (t < 9 && page === 1)) {
              return <div key={idx} className='shop-items__container__item'>
                <Image className='img-wrapper' src={el.img === `image21`
                    ? image21 : el.img === `image22`
                        ? image22 : image3} height={100} width={100} alt='img'/>
                <span className='weight-font'>{el.weight}</span>
                <Link onClick={() => {
                  dispatch(setCurItemState([el]))
                }} as={`/${el.code}`} href={{
                  pathname: '/cardPage',
                  query: {a: JSON.stringify(currentItem)}
                }}><span onClick={() => cardWindowHandle(el)}
                         className='main-text'>{el.name}</span></Link>
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
                  <div  onClick={() => {
                    dispatch(setCartItemState([...itemState, el]))
                    dispatch(setAmount([...amount, 1]))
                  }}
                       className={itemState.some(ele => ele.code === el.code) ? 'cart-btn active-cart' : 'cart-btn'}>
                    {itemState.some(ele => ele.code === el.code) ? 'в корзине' : 'в корзину'}
                  </div>
                </div>
              </div>
            }
          }
        }
      }
    }) : itemsList.sort(eval(setSort()!)).map((el, idx) => {
      if (idx >= page * 9 - 9 && idx < page * 9)
        return <div key={idx} className='shop-items__container__item'>
          <Image height={100} width={100} className='img-wrapper' src={el.img === `image21`
              ? image21 : el.img === `image22`
                  ? image22 : image3} alt='img'/>
          <span className='weight-font'>{el.weight}</span>
          <Link onClick={() => {
            dispatch(setCurItemState([el]))
          }} as={`/${el.code}`} href={{
            pathname: '/cardPage',
            query: {a: JSON.stringify(currentItem)}
          }}><span onClick={() => cardWindowHandle(el)}
                   className='main-text'>{el.name}</span></Link>
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
            <div data-testid={`${idx}`} onClick={() => {
              dispatch(setCartItemState([...itemState, el]))
              dispatch(setAmount([...amount, 1]))
            }}
                 className={itemState.some(ele => ele.code === el.code) ? 'cart-btn active-cart' : 'cart-btn'}>
              {itemState.some(ele => ele.code === el.code) ? 'в корзине' : 'в корзину'}
            </div>
          </div>
        </div>
    })
  }

  return (
      <div className='main'>
        <div className='main__nav'>
          <span onClick={() => setAdmin(false)} className='main__top-font dots'>Главная</span>
          <span className='main__top-font grey'>Косметика и гигиена</span>
        </div>
        {admin ?
            <div className='admin-container'>
              <div className='admin-list'>
                {itemsList.map((el, idx) => <div className='admin-wrapper main-text' key={idx}>
                  <div onClick={() => {
                    setEdit(idx)
                    setAddTypeFilter(el.careType)
                  }} className='yellow-btn'>Edit item {idx}</div>
                  <span>{`Item ${idx}`}</span>
                  <Image className='img-wrapper' src={el.img === `image21`
                      ? image21 : el.img === `image22`
                          ? image22 : image3} height={100} width={100} alt='img'/>
                  <span>{el.code}</span>
                  <span>{el.brand}</span>
                  <span>{el.price}</span>
                  <span>{el.weight}</span>
                  <span>{el.manufacturer}</span>
                  <span style={{display: 'flex', flexDirection: 'column'}}>{el.careType}</span>

                  <div onClick={() => handleDelete(idx)} className='yellow-btn'>Delete
                    item {idx}</div>
                  {edit === idx ? <form onSubmit={(e) => {
                    e.preventDefault()
                    editHandle(idx)
                  }}>
                    <input type='text' onChange={(e) => setAddImg(e.target.value)}
                           value={addImg || el.img} placeholder='img.src'/>
                    <input onChange={(e) => setAddBrand(e.target.value)}
                           value={addBrand || el.brand} type='text' placeholder='brand'/>
                    <input onChange={(e) => setAddName(e.target.value)} value={addName || el.name}
                           type='text' placeholder='name'/>
                    <input onChange={(e) => setAddPrice(e.target.value)}
                           value={addPrice || el.price} type='text' placeholder='price'/>
                    <input onChange={(e) => setAddCode(e.target.value)} value={addCode || el.code}
                           type='text' placeholder='code'/>
                    <input onChange={(e) => setAddWeight(e.target.value)}
                           value={addWeight || el.weight} type='text' placeholder='weight'/>
                    <input onChange={(e) => setAddManufacturer(e.target.value)}
                           value={addManufacturer || el.manufacturer} type='text'
                           placeholder='manufacturer'/>
                    {addTypeFilter.map((el, idx) => <div key={idx}>{el}</div>)}
                    <div className='select-wrapper'>
                      <div></div>
                      <select
                          onChange={(e) => setAddTypeFilter([...addTypeFilter, e.target.value || ''])}
                          className='select'>
                        {headersArray.map((el, idx) => <option key={idx}
                                                               value={`${el}`}>{el}</option>)}
                      </select>
                    </div>
                    <button type='submit'>Submit</button>
                  </form> : ''}
                </div>)}
              </div>
              {refactor ? <form onSubmit={(e) => {
                    e.preventDefault()
                    submitHandle()
                  }}>
                    <input type='text' onChange={(e) => setAddImg(e.target.value)} value={addImg}
                           placeholder='img.src'/>
                    <input onChange={(e) => setAddBrand(e.target.value)} value={addBrand} type='text'
                           placeholder='brand'/>
                    <input onChange={(e) => setAddName(e.target.value)} value={addName} type='text'
                           placeholder='name'/>
                    <input onChange={(e) => setAddPrice(e.target.value)} value={addPrice} type='text'
                           placeholder='price'/>
                    <input onChange={(e) => setAddCode(e.target.value)} value={addCode} type='text'
                           placeholder='code'/>
                    <input onChange={(e) => setAddWeight(e.target.value)} value={addWeight} type='text'
                           placeholder='weight'/>
                    <input onChange={(e) => setAddManufacturer(e.target.value)} value={addManufacturer}
                           type='text' placeholder='manufacturer'/>
                    {addTypeFilter.map((el, idx) => <div key={idx}>{el}</div>)}
                    <div className='select-wrapper'>
                      <div></div>
                      <select
                          onChange={(e) => setAddTypeFilter([...addTypeFilter, e.target.value || ''])}
                          className='select'>
                        {headersArray.map((el, idx) => <option key={idx} value={`${el}`}>{el}</option>)}
                      </select>
                    </div>
                    <button type='submit'>Submit</button>
                  </form> :
                  <div onClick={() => setRefactor(true)} className='yellow-btn'>Add item</div>}
            </div>
            : <div className='main__content'>
              <div className='sort-wrapper'>
                <span className='main__content__title'>Косметика и гигиена</span>
                <div>
                  <span className='sort-font'>Сортировка: </span>
                  <select data-testid='sort' onChange={(e) => setSortSelect(parseInt(e.target.value))}
                          className='select'>
                    <option value='0'>По названию(А-Я)</option>
                    <option value='1'>По названию(Я-А)</option>
                    <option data-testid='sort-btn' value='2'>Сначала дорогие</option>
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
                    <span onClick={() => setAdmin(true)} className='admin'>ADMIN MODE</span>
                    <span className="aside-filters__title">Цена ₸</span>
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
                  <div className='filters-container'>
                    <span className='aside-filters__title'>Производитель</span>
                    <div className='search-bar'>
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
                    <div className='search-bar'>
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
                    <div data-testid='show-button' onClick={() => setShowFilter(true)} className='yellow-btn'>
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
                <span className='arrow'
                      onClick={() => setPage(page !== 1 ? page - 1 : page)}>{'<'}</span>
                <div className='page'>{page}</div>
                <span className='arrow'
                      onClick={() => setPage((page + 1) * 9 - 9 > itemsList.length ? page : page + 1)}>{'>'}</span>
              </div>
            </div>}
      </div>
  );
};

export default Main;
