const socket = io({ //Token de autorização
    auth: {
      token: {
        value: localStorage.getItem("auth:token"),
        roomType: 'private'
      }
    }
});

//Exibe a janela de erro em caso de falha na autenticação
//ou um botao pra entrar no chat se a autenticação for sucesso
socket.on("connect_error", (err) => {
    const errorWindow = document.querySelector('.modal');
    const erroMsg = err.message=='Você já está conectado!' ? "" : '<a href="/">Faça o login</a>';
    
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');

    const errorText = document.createElement('p');
    errorText.textContent = err.message;

    errorDiv.append(errorText)
    errorDiv.innerHTML += erroMsg;

    errorWindow.innerHTML = null;
    errorWindow.append(errorDiv);

    errorWindow.querySelector('.error').style.opacity = 1;
});

const modalEntrar = document.querySelector('.modal');
modalEntrar.querySelector('.modalLogin a').addEventListener('click', (e) => {
  e.preventDefault();
});
modalEntrar.querySelector('.modalLogin').style.opacity = 1;
//


//Variaveis
let username = '';
let userList = [];
//Seleciona os elementos e atribui a uma variavel
let modalLogin = document.querySelector('.modal');
let chatPage = document.querySelector('#chatPage');
let textInput = document.querySelector('#chatTextInput');
let inputButton = document.querySelector('.chatInput button');


//Menu para alternar entre chat e usuarios no mobile
const chatButton = document.querySelector('#chatButton');
const userButton = document.querySelector('#userButton');
chatButton.addEventListener('click', () => {
    chatButton.style.borderBottom = '4px solid #6b49a7';
    userButton.style.borderBottom = '4px solid #1F1F1F';
    document.querySelector('.chatList').style.display = 'block';
    document.querySelector('.userList').style.display = 'none';
})
userButton.addEventListener('click', () => {
  userButton.style.borderBottom = '4px solid #6b49a7';
  chatButton.style.borderBottom = '4px solid #1F1F1F';
  document.querySelector('.userList').style.display = 'block';
  document.querySelector('.chatList').style.display = 'none';
})



//Requisição para entrar no Chat
function loginInChat() {
    modalLogin.querySelector('.modalLogin a').removeEventListener('click', loginInChat);
    socket.emit('join-request');
    modalLogin.style.display = 'none';
}
modalLogin.querySelector('.modalLogin a').addEventListener('click', loginInChat);
//


//Enviar Mensagem apertando a tecla Enter
textInput.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
      let txt = textInput.value.trim();
      textInput.value = '';

      if(txt != '') {
          // addMessage('msg', username, txt);
          socket.emit('send-msg', txt);
      }
  }
})
//Enviar Mensagem apertando no botao()
inputButton.addEventListener('click', () => {
  let txt = textInput.value.trim();
  textInput.value = '';

  if(txt != '') {
      // addMessage('msg', username, txt);
      socket.emit('send-msg', txt);
  }
})
//

//Ok Signal - Recebe o sinal de conectado no Chat com sucesso
socket.on('user-ok', (data) => {
  textInput.focus();
  addMessage('status', null, 'Conectado!');
  userList = data.connectedUsersPrivate;
  username = data.nickname;
  renderUserList();
})


//Atualizar lista de usuarios conectados
socket.on('list-update', (data) => {
  if(data.joined) {
      addMessage('status', null, data.joined+' entrou no chat.');
  }
  if(data.left) {
      addMessage('status', null, data.left+' saiu do chat.');
  }

  userList = data.list;
  renderUserList();
})
//


//Exibir mensagem dos outros usuarios
socket.on('show-msg', (data) => {
  addMessage('msg', data.username, data.message);
})
//


//Status de desconectado
socket.on('disconnect', () => {
  addMessage('status', null, 'Você foi desconectado!');
  userList = [];
  renderUserList();
});
//


//Status de reconnect
socket.io.on('reconnect', () => {

  addMessage('status', null, 'Reconectando...');
  socket.emit('join-request');
})




//FUNÇÕES

function getFormattedDate() {
  let currentTime = new Date();
  let hourX = `${currentTime.getHours()}`;
  let hour = hourX;
  if(hourX.length == 1) {
    hour = '0'+hourX;
  }
  let minuteX = `${currentTime.getMinutes()}`;
  let minute = minuteX;
  if(minuteX.length == 1) {
    minute = '0'+minuteX;
  }
  let hourAbbreviation = '';
  if(hour>=12) {
      hourAbbreviation = 'PM';
  } else {
      hourAbbreviation = 'AM';
  }

  return `${hour}:${minute} ${hourAbbreviation}`;
}

//Atualizar lista de usuarios
function renderUserList() {
  let ul = document.querySelector('.userList');
  ul.innerHTML = null;

  userList.forEach(i => {
      const userElement = document.createElement('li');
      userElement.textContent = i;
      ul.append(userElement);
  })
}

//Adicionar mensagem(do proprio usuario e tambem dos outros)
function addMessage(type, user, msg) {
  let ul = document.querySelector('.chatList');

  switch(type) {
      case 'status':
          const statusElement = document.createElement('li');
          statusElement.classList.add('m-status');
        
          const statusDiv = document.createElement('div');
          statusDiv.textContent = msg;

          statusElement.append(statusDiv);
          ul.append(statusElement);
          break;
      case 'msg':
          if(username == user) {
              const myMessageElement = document.createElement('li');
              myMessageElement.classList.add('m-txt');
              myMessageElement.classList.add('me');

              const myMessageDiv = document.createElement('div');
              
              const myMessageUser = document.createElement('span');
              myMessageUser.classList.add('user');
              myMessageUser.textContent = user;

              const myMessageText = document.createElement('p');
              myMessageText.classList.add('msg');
              myMessageText.textContent = msg;

              const myMessageTime = document.createElement('span');
              myMessageTime.classList.add('hour');
              myMessageTime.textContent = getFormattedDate();

              myMessageDiv.append(myMessageUser, myMessageText, myMessageTime);
              myMessageElement.append(myMessageDiv);
              ul.append(myMessageElement);
              break;
          } else {
              const msgElement = document.createElement('li');
              msgElement.classList.add('m-txt');
              msgElement.classList.add('other');

              const msgDiv = document.createElement('div');

              const msgUser = document.createElement('span');
              msgUser.classList.add('user');
              msgUser.textContent = user;

              const msgText = document.createElement('p');
              msgText.classList.add('msg');
              msgText.textContent = msg;

              const msgTime = document.createElement('span');
              msgTime.classList.add('hour');
              msgTime.textContent = getFormattedDate();

              msgDiv.append(msgUser, msgText, msgTime);
              msgElement.append(msgDiv);
              ul.append(msgElement);
              break;
          }    
  }
  ul.scrollTop = ul.scrollHeight;
}