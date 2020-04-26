import { observable /*computed*/ } from 'mobx'
import Menu from './components/Menu'
import DisplayOrder from './components/DisplayOrder'
import AddToOrder from './components/AddToOrder'
import AddToMenu from './components/AddToMenu'
import Ticker from './components/Ticker'

// * observable object
// ? useful when you want everything observable
export let appState = observable({
  items: [
    {
      name: 'Trout',
      price: 10,
    },
    {
      name: 'Salmon',
      price: 10,
    },
  ],
  order: [
    /* {name, quantity} */
  ],
  get total() {
    return this.order.reduce((runningTotal, orderItem) => {
      const item = this.items.find((item) => item.name === orderItem.name)
      const subTotal = item.price * orderItem.quantity
      return runningTotal + subTotal
    }, 0)
  },
})

// * class with observable properties
// ? useful if you want to mix observable and non-observable properties?
// class AppState {
//   constructor() {
//     this.items = [
//       {
//         name: 'Trout',
//         price: 10,
//       },
//       {
//         name: 'Salmon',
//         price: 10,
//       },
//     ]

//     this.order = [
//       // {name, quantity}
//     ]
//   }

//   @observable items
//   @observable order

//   @computed get total() {
//     return this.order.reduce((runningTotal, orderItem) => {
//       const item = this.items.find((item) => item.name === orderItem.name)
//       const subTotal = item.price * orderItem.quantity
//       return runningTotal + subTotal
//     }, 0)
//   }
// }
// export let appState = new AppState()

// mount
const app = document.getElementById('app')
app.appendChild(Menu())
app.appendChild(DisplayOrder())
app.appendChild(AddToOrder())
app.appendChild(AddToMenu())

const tickers = document.getElementById('tickers')
appState.items.forEach((item) => tickers.appendChild(Ticker(item)))

// helpers
export function money(float) {
  return float.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

// price fluctuation
setInterval(() => {
  appState.items.forEach((item) => {
    item.price += (Math.random() - 0.5) / 2
  })
}, 50)
