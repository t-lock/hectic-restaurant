import { autorun } from 'mobx'
import { appState, money } from '../app'

export default function Menu() {
  const wrapper = document.createElement('div')
  autorun(() => {
    const items = appState.items
    const template = `
    <h2>Menu</h2>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th class="num">Price</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td>${item.name}</td>
                <td class="num">${money(item.price)}</td>
              </tr>
            `,
          )
          .join('')}
      </tbody>
    </table>
    `
    wrapper.innerHTML = template
  })

  return wrapper
}
