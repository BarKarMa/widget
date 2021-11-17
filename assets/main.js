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
        data: JSON.stringify({'sender': { 'id': '413242354', "name": data.name, 'avatar': ''}, 'message': {'type': 'text', 'text': data.numbers}}),
    
        //contentType: "PostmanRuntime/7.28.4",
        //contentType:"application/json; charset=utf-8",
        dataType: "json",
        contentType: "application/json",
        success: function(){ }
      })
      
      //$.post('/test', data, function() {
      //    console.log('server recieved data')
      //});

      //let res = http.post('https://balance.beesender.com/api/v1.0/sendmessage/5673e2ff-da23-4db4-8da1-963abfdf1395/dca20883-f093-4da4-8fdc-9eae03a51e18', JSON.stringify(data), {
      //  headers: { 'Content-Type': 'application/json' },
      //});
      //console.log(res.json());
      
      //$.post('http://balance.beesender.com/api/v1.0/sendmessage/5673e2ff-da23-4db4-8da1-963abfdf1395/dca20883-f093-4da4-8fdc-9eae03a51e18', {'sender': { 'id': '413242354', "name": '+380992472015', 'avatar': ''}, 'message': {'type': 'text', 'text': 'Вітаю'}}, function(){});
        
      //$.post('https://balance.beesender.com/api/v1.0/sendmessage/5673e2ff-da23-4db4-8da1-963abfdf1395/39871eae-1695-46fe-b8e2-f91597c7a89a',
        //{'sender': { 'id': '413242354', "name": '+380992472015', 'avatar': ''}, 'message': {'type': 'text', 'text': 'Вітаю'}},
        //function (error, response, body) {
        //    if (!error && response.statusCode == 200) {
        //        console.log(body);
        //    }
        //});

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
  if (data.channel_id === "DCA20883-F093-4DA4-8FDC-9EAE03A51E18"){
    //div.className = "alert";
    item.innerHTML = `<p style="text-align: right;">${data.name}:</p> <span id="server-messages">${data.content.text}</span>`
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
