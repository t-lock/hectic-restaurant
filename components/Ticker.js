export default function Ticker(item) {
  const wrapper = document.createElement('div')
  const canvas = document.createElement('canvas')

  wrapper.innerHTML = `<strong>${item.name}</strong>`
  wrapper.appendChild(canvas)

  const c = canvas.getContext('2d')

  function Path(x, y) {
    this.x = x
    this.y = y

    c.translate(canvas.width / 2 - 3, 0)
    this.draw = () => {
      c.fillStyle = this.y > canvas.height / 2 ? '#22D0B2' : '#EF496A'
      c.fillRect(this.x, this.y, 2, 2)
    }

    this.update = () => {
      let imageData = c.getImageData(0, 0, canvas.width, canvas.height)
      c.putImageData(imageData, -1, 0)
      this.y = canvas.height / 2 - (item.price - 10) * 10
      if (this.y < 0) this.y = 0
      if (this.y >= canvas.height - 2) this.y = canvas.height - 2
      this.draw()
    }
  }
  const path = new Path(canvas.width / 2, canvas.height / 2)

  function animate() {
    requestAnimationFrame(animate)
    path.update()
  }
  animate()

  return wrapper
}
