const socket = io()

const messages = document.querySelector('.messages')

// ('#messages')
// getByDataHook(dataHook) { return document.querySelector('[data-hook="ChatWindow.messagesWrapper"]'); }
// ('[data-hook="ChatWindow.messagesWrapper"]')
// <div data-hook="ChatWindow.messagesWrapper" class="messagesWrapper">..here will be allmessages + header..</div>
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector('.name')
import BEESENDER_URL from "/site.js"


//const userName = prompt('Ваше імя:')

const time = new Date();
const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });
const item_hello = document.createElement('div')
item_hello.innerHTML = `<div><p class="hello-messages" style="text-align: center;">Вітаємо вас у контактному центрі! Для зв'язку з оператором надішліть повідомлення.</p></div>`
messages.appendChild(item_hello)



//////
function updateScroll(){
  var element = document.getElementById("li");
  element.scrollTop = element.scrollHeight;
}
/////

// евенти вынести в отдельный файл
document.addEventListener('submit', (e) =>{
    
    e.preventDefault()
    setInterval(updateScroll,2000);

    // частина де відправляються дані на сервер через експрес
    //const name = userName;
    const name = socket.id;
    const numbers = $("#widget-inp-1").val();  // поменять переменную

    const data = {
        name,
        numbers
      }


      $.ajax({
        type:"POST",
        url: BEESENDER_URL,
        //url: "https://balance.beesender.com/api/v1.0/sendmessage/5673e2ff-da23-4db4-8da1-963abfdf1395/dca20883-f093-4da4-8fdc-9eae03a51e18",
        data: JSON.stringify({'sender': { 'id': socket.id, "name": data.name, 'avatar': ''}, 'message': {'type': 'text', 'text': data.numbers}}),

        dataType: "json",
        contentType: "application/json",
        success: function(){ }
      })    

    if(input.value){

        socket.emit('chat message', { 
          message: input.value,
          //name: userName
          name: socket.id
        })
        input.value = ''
        

    }
    
})


socket.on('chat message', (data) => {


  const item1 = document.createElement('div')
  //item1.innerHTML = `<p style="margin-left:150px">${formattedTime}</p>`
  item1.innerHTML = `<p class="time">${formattedTime}</p>`
  messages.appendChild(item1)
  const item = document.createElement('div')

  // вынести звідси код в окремий файл - ключ
  if (data.channel_id === "DCA20883-F093-4DA4-8FDC-9EAE03A51E18"){
    item.innerHTML = `<p class="operator-name" style="text-align: right;">Оператор:(Online)</p> <span id="server-messages">${data.content.text}</span>`
    messages.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight)
  }
  else {
    item.innerHTML = `<p>ВИ:</p> <span id="my-messages"; ">${data.message}</span>`

    
    messages.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight)
  }
  


}
  
)
