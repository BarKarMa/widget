# widget

Based on Node.js + HTML5 + CSS5 widget for Creatio CRM integration. Sessions maked using socket.io.
It will work easily only if you have the Beesender chat plugin.
This widget would not work with build in Creatio chat plugin.

## Plans to do:
- update project structure for NPM upload;
- separate client side part on small modules;
- make admin part in different way like telegram or either messanger app for easy using and separate html admin panel
- add posibility to add files by redis or another system


If you want to use it on your site U need to:

## 1. Take from index.html file of project the body tag and all of scripts part 
## 2. Create using beesender instuction(https://beesender.atlassian.net/wiki/spaces/UserDocumentation/pages/162594817/1+Endpoint+API) the chanel. 

## 3. Change in AJAX part of client side "url" variable to your beesender api code

"https://balance.beesender.com/api/v1.0/sendmessage/sendmessage/{Appid}/{ChannelId}"

 where "AppId" – your secret key,
 and "ChannelId" – guid, from test hook: 

 ```
 $.ajax({
        type:"POST",
        url: "here your beesender part",
        data: JSON.stringify({'sender': { 'id': socket.id, "name": data.name, 'avatar': ''}, 'message': {'type': 'text', 'text': data.numbers}}),
        dataType: "json",
        contentType: "application/json",
        success: function(){ }
      })
 ```     


## 4. install and update dependences from package.json from the root of the project 
## 5. run on your server
