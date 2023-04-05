import Main from "../main/Main";
import {render, screen} from "@testing-library/react";
import {useSelector} from "react-redux";
import "@testing-library/jest-dom"
import React from "react";
import Header from "../header/Header";
import {selectAmountItemState} from "../../store/storeItems";
import * as reduxHooks from 'react-redux'


jest.mock("react-redux")

const test = [
  {
    img: "image21",
    "manufacturer": "Нэфис",
    "weight": "450 мл",
    "name": "AOS средство для мытья посуды Crystal",
    "code": "4604049097548",
    "brand": "AOS",
    price: "101,25 ₸",
    "careType": [
      "Гигиеническая продукция"
    ]
  },
  {
    "img": "image22",
    "manufacturer": "Fairy",
    "weight": "15X28.8 г",
    "name": "ARIEL Автмат Гель СМС жидкое \nв растворимых капсулах Liquid Capsules Горный родник",
    "code": "1845678901001",
    "brand": "Nivea",
    price: "53,20 ₸",
    "careType": [
      "Гигиеническая продукция"
    ]
  },
]

describe('Main', () => {

  it('renders homepage unchanged', () => {
    useSelector.mockReturnValueOnce(test)
      .mockReturnValueOnce([1, 1])
    const container = render(<Main/>)
    expect(container).toMatchSnapshot()
  })
})

describe('Header', () => {
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
