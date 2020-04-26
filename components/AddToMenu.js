import { appState } from '../app'

export default function AddToMenu() {
  const wrapper = document.createElement('form')
  const { items } = appState

  const template = `
    <h2>Add new item to menu 👨‍🍳</h2>
    <div class="input-row">
      <input class="input" type="text" value="" placeholder="Name" />
      <input class="input" type="number" placeholder="Price" value="" />
      <button class="button is-primary">Add to menu</button>
    </div>
  `
  wrapper.innerHTML = template

  wrapper.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = wrapper.querySelector('input[type=text]').value
    const price = parseInt(wrapper.querySelector('input[type=number]').value)
    if (!name || !price) return
    if (items.find((item) => item.name === name)) {
      alert("Clever, but no. That's already on the menu.")
    } else {
      items.push({ name: name, price: price })
    }
  })

  return wrapper
}
