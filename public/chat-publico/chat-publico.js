const modalEntrar = document.querySelector('.modal');
// modalEntrar.querySelector('.modalEntrar a').addEventListener('click', (e) => {
//   e.preventDefault();
// });
// modalEntrar.querySelector('.modalEntrar').style.opacity = 1;
// //


//Variaveis
let username = '';
let userList = [];
//Seleciona os elementos e atribui a uma variavel
// let modalLogin = document.querySelector('.modal');
let chatPage = document.querySelector('#chatPage');
let textInput = document.querySelector('#chatTextInput');
let inputButton = document.querySelector('.chatInput button');


//Requisição para entrar no Chat
async function loginInChat(e) {
    e.preventDefault();
    modalEntrar.querySelector('.modalEntrar a').removeEventListener('click', loginInChat);
    const nick = modalEntrar.querySelector('.modalEntrar input').value;
    
    const socket = await io({ //Token de autorização
      auth: {
        token: {
          value: localStorage.getItem("auth:token"),
          roomType: 'public',
          nickname: nick
        }
      }
    });
    
    await socket.emit('join-request', nick);
    
    document.querySelector('.modalEntrar').innerHTML = '<div class="loader"></div>';

    //Exibe a janela de erro em caso de falha na autenticação
    //ou um botao pra entrar no chat se a autenticação for sucesso
    socket.on("connect_error", (err) => {
      const errorWindow = document.querySelector('.modal');
      
      errorWindow.innerHTML =
        `<div class="modalEntrar">
          <p>${err.message}</p>
          <a href="">Tente novamente</a>
        </div>`;
      errorWindow.querySelector('.modalEntrar').style.opacity = 1;
    });

    //Ok Signal - Recebe o sinal de conectado no Chat com sucesso
    socket.on('user-ok', (data) => {
      modalEntrar.style.display = 'none';
      textInput.focus();
      addMessage('status', null, 'Conectado!');
      userList = data.connectedUsersPublic;
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


}
modalEntrar.querySelector('.modalEntrar a').addEventListener('click', loginInChat);
//


function isConnected() {
    
}







//FUNÇÕES

//Atualizar lista de usuarios
function renderUserList() {
  let ul = document.querySelector('.userList');
  ul.innerHTML = '';

  userList.forEach(i => {
      ul.innerHTML += '<li>'+i+'</li>';
  })
}

//Adicionar mensagem(do proprio usuario e tambem dos outros)
function addMessage(type, user, msg) {
  let ul = document.querySelector('.chatList');

  let currentTime = new Date();
  let hora = currentTime.getHours();
  let minuto = currentTime.getMinutes();
  let hourafter = '';
  if(hora>=12) {
      hourafter = 'PM';
  } else {
      hourafter = 'AM';
  }
  switch(type) {
      case 'status':
          ul.innerHTML += '<li class="m-status"><div>'+msg+'</div></li>';
          break;
      case 'msg':
          if(username == user) {
              ul.innerHTML +=
              `<li class="m-txt me">
                  <div>
                      <span class="user">${user}</span>
                      <p class="msg">${msg}</p>
                      <span class="hour">${hora}:${minuto} ${hourafter}</span>
                  </div>
              </li>`;
              break;
          } else {
              ul.innerHTML +=
              `<li class="m-txt other">
                  <div>
                      <span class="user">${user}</span>
                      <p class="msg">${msg}</p>
                      <span class="hour">${hora}:${minuto} ${hourafter}</span>
                  </div>
              </li>`;
              break;
          }    
  }
  ul.scrollTop = ul.scrollHeight;
}