exports = module.exports = function (messages, item_hello) {
  item_hello.innerHTML = `<div><p class="hello-messages" style="text-align: center;">Вітаємо вас у контактному центрі! Для зв'язку з оператором надішліть повідомлення.</p></div>`
  messages.appendChild(item_hello)
}