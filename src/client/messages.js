const messages = document.querySelector('.messages')
const item_hello = document.createElement('div')

exports = module.exports = function () {
  item_hello.innerHTML = `<div><p class="hello-messages" style="text-align: center;">Вітаємо вас у контактному центрі! Для зв'язку з оператором надішліть повідомлення.</p></div>`
  messages.appendChild(item_hello)
}