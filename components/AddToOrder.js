import { autorun } from 'mobx'
import { appState } from '../app'

export default function AddToOrder() {
  const wrapper = document.createElement('form')
  const { order, items } = appState

  autorun(() => {
    wrapper.innerHTML = `
      <h2>Add to order ✏️</h2>
      <div class="select">
        <select style="width: 7em" value="">
          ${items.map(
            (item) => `<option value="${item.name}">${item.name}</option>`,
          )}
        </select>
      </div>
      <input class="input" type="number" style="width: 4em" value="1" placeholder="Num"/>
      <button class="button is-primary">Add to order</button>
    `
  })

  wrapper.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = wrapper.querySelector('select').value
    const quantity = parseInt(wrapper.querySelector('input').value)
    if (!name || !quantity) return
    if (order.find((item) => item.name === name)) {
      order[order.findIndex((item) => item.name === name)].quantity += quantity
    } else {
      order.push({ name, quantity })
    }
  })

  return wrapper
}
