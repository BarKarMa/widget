module.exports = function() {
  const messages = document.querySelector('.messages')

  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });
  const item_hello = document.createElement('div')
  item_hello.innerHTML = `<div><p class="hello-messages" style="text-align: center;">Вітаємо вас у контактному центрі! Для зв'язку з оператором надішліть повідомлення.</p></div>`
  messages.appendChild(item_hello)
}