const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector('.name')


//const requests = require('request')

const userName = prompt('Ваше імя:')

const time = new Date();
const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });

nameBlock.innerHTML = `${userName}`

//////
function updateScroll(){
  var element = document.getElementById("li");
  element.scrollTop = element.scrollHeight;
}
/////


document.addEventListener('submit', (e) =>{
    
    e.preventDefault()
    setInterval(updateScroll,1000);

    // частина де відправляються дані на сервер через експрес
    const name = userName;
    const numbers = $("#numbers").val();

    const data = {
        name,
        numbers
      }


      $.ajax({
        type:"POST",
        url: "https://balance.beesender.com/api/v1.0/sendmessage/5673e2ff-da23-4db4-8da1-963abfdf1395/dca20883-f093-4da4-8fdc-9eae03a51e18",
        data: JSON.stringify({'sender': { 'id': data.name, "name": data.name, 'avatar': ''}, 'message': {'type': 'text', 'text': data.numbers}}),
    
        //contentType: "PostmanRuntime/7.28.4",
        //contentType:"application/json; charset=utf-8",
        dataType: "json",
        contentType: "application/json",
        success: function(){ }
      })
      
    

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
  


  const item1 = document.createElement('div')
  //item1.innerHTML = `<p style="margin-left:150px">${formattedTime}</p>`
  item1.innerHTML = `<p class="time">${formattedTime}</p>`
  messages.appendChild(item1)
  const item = document.createElement('div')

  // вынести звідси код в окремий файл - ключ
  if (data.channel_id === "DCA20883-F093-4DA4-8FDC-9EAE03A51E18"){
    //div.className = "alert";
    item.innerHTML = `<p style="text-align: right;">Оператор Олекса:</p> <span id="server-messages">${data.content.text}</span>`
    //item.innerHTML = `<p style="text-align: right;">${data.name}:</p> <span id="server-messages">${data.content.text}</span>`
    messages.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight)
  }
  else {
    item.innerHTML = `<p>${data.name}:</p> <span id="my-messages"; ">${data.message}</span>`
    
    messages.appendChild(item)
    window.scrollTo(0,document.body.scrollHeight)
  }
  
  //item.innerHTML = `<p>${formattedTime}</p><span>${data.name}</span>: ${data.message}`
  //messages.appendChild(item)
  //window.scrollTo(0,document.body.scrollHeight)

}
)

socket.on('typing', (data) => {
  const item1 = document.createElement('div')
  item1.innerHTML = `<p class="typing">${data.username}</p> is typing a message...`
  messages.appendChild(item1)

})