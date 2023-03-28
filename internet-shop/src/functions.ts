import {useSelector, useDispatch} from "react-redux";
import {selectAmountItemState, selectItemState, setAmount, setItemState} from "@/store/storeItems";

const amount = useSelector(selectAmountItemState)
const itemState = useSelector(selectItemState)
const dispatch = useDispatch()
export const handleAmount = (idx: number) => {
  const arr = [...amount]
  arr[idx] += 1
  dispatch(setAmount(arr))
}

export const handleDecrease = (idx: number) => {
  if (amount[idx] !== 1) {
    const arr = [...amount]
    arr[idx] -= 1;
    dispatch(setAmount(arr))
  }
}

export const countPrice = () => {
  const ans = 0
  return itemState.reduce((acc, cur, idx) => acc + (amount[idx] * parseFloat(cur.price.split(' ')[0].replace(',', '.'))), ans).toFixed(2) + ' ₸'
}
