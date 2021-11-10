const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector('.name')

const userName = prompt('Ваше імя:')

const time = new Date();
const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

nameBlock.innerHTML = `${userName}`




document.addEventListener('submit', (e) =>{
    e.preventDefault()

    // частина де відправляються дані на сервер через експрес
    const name = userName;
    const numbers = $("#numbers").val();

    const data = {
        name,
        numbers
      }
      $.post('/test', data, function() {
          console.log('server recieved data')
      });

      // частина де відправляються сокети
    if(input.value){
        socket.emit('chat message', { 
          message: input.value,
          name: userName
        })
        input.value = ''

    }
})


socket.on('chat message', (data) => {
    
  const item = document.createElement('div')
  const item1 = document.createElement('div')
  
  item.innerHTML = `<span>${data.name}</span>: ${data.message}`
  messages.appendChild(item)
  const item1 = document.createElement('div')
  item1.innerHTML = `<span>${formattedTime}</span>`
  messages.appendChild(item1)
  window.scrollTo(0,document.body.scrollHeight)

}
)
