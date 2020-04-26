import { appState } from '../app'
import Ticker from './Ticker'

export default function AddToMenu() {
  const wrapper = document.createElement('form')
  const { items } = appState
  const tickers = document.getElementById('tickers')

  const template = `
    <h3>Add new item to menu 👨‍🍳</h3>
    <div class="input-row">
      <input class="input" type="text" value="" placeholder="Name" />
      <!--<input class="input" type="number" placeholder="Price" value="" />-->
      <button class="button is-primary">Add to menu</button>
    </div>
  `
  wrapper.innerHTML = template

  wrapper.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = wrapper.querySelector('input[type=text]').value
    // const price = parseInt(wrapper.querySelector('input[type=number]').value)
    const price = 10
    if (!name || !price) return
    if (items.find((item) => item.name === name)) {
      alert("Clever, but no. That's already on the menu.")
    } else {
      wrapper.querySelector('input[type=text]').value = ''
      items.push({ name, price })
      tickers.appendChild(
        Ticker(appState.items.find((item) => item.name === name)),
      )
    }
  })

  return wrapper
}
