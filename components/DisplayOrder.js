import { autorun } from 'mobx'
import { appState, money } from '../app'

export default function StateViewer() {
  const wrapper = document.createElement('div')

  autorun(() => {
    const { order, total } = appState
    wrapper.innerHTML = `
      <h2>Your Order 🗒️</h2>
      ${
        order.length
          ? `
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="num">Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${order
              .map(
                (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td class="num">${item.quantity}</td>
                  </tr>
                `,
              )
              .join('')}
          </tbody>
        </table>
        <strong style="display: block; margin-top: 10px; text-align: right">
          Total: ${money(appState.total)}
        </strong>
      `
          : `
        <table><tr><td>Your order is empty</td></tr></table>
      `
      }
    `
  })

  return wrapper
}
