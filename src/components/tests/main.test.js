import Main from "../main/Main";
import {fireEvent, render, screen} from "@testing-library/react";
import {useSelector} from "react-redux";
import "@testing-library/jest-dom"
import React from "react";
import Header from "../header/Header";
import * as reduxHooks from 'react-redux'
import CardPage from "../../pages/cardPage";


jest.mock("react-redux")

const test = [
  {
    img: "image21",
    manufacturer: "Нэфис",
    weight: "450 мл",
    name: "AOS средство для мытья посуды Crystal",
    code: "4604049097548",
    brand: "AOS",
    price: "101,25 ₸",
    careType: [
      "Гигиеническая продукция"
    ]
  },
  {
    img: "image22",
    manufacturer: "Fairy",
    weight: "15X28.8 г",
    name: "ARIEL Автмат Гель СМС жидкое \nв растворимых капсулах Liquid Capsules Горный родник",
    code: "1845678901001",
    brand: "Nivea",
    price: "53,20 ₸",
    careType: [
      "Гигиеническая продукция"
    ]
  },
]


const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('Main', () => {
  it('adding an item to cart work properly', () => {
    useSelector.mockReturnValueOnce([])
      .mockReturnValueOnce([])
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch)
    render(<Main/>)
    fireEvent.click(screen.getByTestId('1'))
    expect(dispatch).toHaveBeenCalled()
  })

  it('adding an active class to item', () => {
    useSelector.mockReturnValueOnce(test)
      .mockReturnValueOnce([])
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch)
    render(<Main/>)
    const element = screen.getByTestId('0')
    fireEvent.click(element)
    expect(element).toHaveClass('active-cart')
  })

  it('items sorting properly', () => {
    useSelector.mockReturnValueOnce(test)
      .mockReturnValueOnce([])
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch)
    const element = render(<Main/>)
    const sort = screen.getByTestId('sort')
    const btn = screen.getByTestId('sort-btn')
    fireEvent.click(sort)
    fireEvent.click(btn)
    expect(element).toMatchSnapshot()
  })

  it('items filter works properly', () => {
    useSelector.mockReturnValue([])
    const container = render(<Main/>)
    fireEvent.click(screen.getByTestId('0-box'))
    fireEvent.click(screen.getByTestId('2-box'))
    fireEvent.click(screen.getByTestId('4-box'))
    fireEvent.click(screen.getByTestId('show-button'))
    expect(container).toMatchSnapshot()
  })

  it('correct render of homepage', () => {
    useSelector.mockReturnValueOnce(test)
      .mockReturnValueOnce([1, 1])
    const container = render(<Main/>)
    expect(container).toMatchSnapshot()
  })
})

describe('Header', () => {
  it('should properly render basic empty cart', () => {
    useSelector.mockReturnValueOnce([])
      .mockReturnValueOnce([])
    const header = render(<Header/>);
    expect(header).toMatchSnapshot()
  })

  it('should properly count cart price', () => {
    useSelector.mockReturnValueOnce(test)
      .mockReturnValueOnce([1, 1])
    const header = render(<Header/>);
    const text = header.getByTestId('price')
    expect(text).toHaveTextContent('154.45 ₸')
  })

  it('should show correct cart amount', () => {
    useSelector.mockReturnValueOnce(test)
      .mockReturnValueOnce([1, 1])
    const header = render(<Header/>);
    const text = header.getByTestId('cart-length')
    expect(text).toHaveTextContent('2')
  })
})

describe('cardPage', () => {
  it('should render page and correctly change item amount', () => {
    useSelector.mockReturnValue(test)
    const card = render(<CardPage/>);
    fireEvent.click(screen.getByTestId('increase-btn'))
    expect(card).toMatchSnapshot()
  })

  it('should correctly handle add to cart function', () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch)
    render(<CardPage/>);
    fireEvent.click(screen.getByTestId('toCart-btn'))
    expect(dispatch).toHaveBeenCalled()
  })
})
