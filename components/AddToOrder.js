import { autorun } from 'mobx'
import { appState } from '../app'

export default function AddToOrder() {
  const wrapper = document.createElement('form')
  const { order, items } = appState

  autorun(() => {
    wrapper.innerHTML = `
      <h3>Add to order ✏️</h3>
      <div class="input-row">
        <div class="select">
          <select value="">
            ${items.map(
              (item) => `<option value="${item.name}">${item.name}</option>`,
            )}
          </select>
        </div>
        <input class="input" type="number" value="1" placeholder="Num"/>
        <button class="button is-primary">Add to order</button>
      </div>
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
