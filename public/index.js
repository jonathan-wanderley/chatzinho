//Url do server
const url = window.location.origin; //URL BASE DO SITE

document.querySelector('.chamadaRegistro a').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.login').classList.add('none');
    document.querySelector('.registro').classList.remove('none');
})

//Checar se o usuario está logado ou não
async function exec() {
    const request = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth:token")}`,
            Accept: "application/json",
        }
    };
    await fetch(`${url}/api/auth`, request)
        .then((request) => request.json())
        .then((resposta) => {
            const { notallowed, nickname } = resposta;

            if(!notallowed) { //LOGADO
                document.querySelector('.logado p').innerHTML = `Olá <b>${nickname}</b>, acesse um de nossos chats abaixo!`;
                document.querySelector('.logado').style.display = 'flex'
                document.querySelector('section').style.display = 'none';
            } else {  //Não LOGADO
                document.querySelector('.logado p').innerText = '';
                document.querySelector('.logado').style.display = 'none';
                document.querySelector('section').style.display = 'flex';
            }
            document.querySelector('.loader-box').remove();
        })
}
exec();


//Função de registrar, disparada ao clicar no botão Cadastrar
async function registrar() {
    let nickname = document.querySelector('.regNome').value;
    let email = document.querySelector('.regEmail').value;
    let password = document.querySelector('.regPass').value;

    const request = {
        method: 'POST',
        body: `nickname=${nickname}&email=${email}&password=${password}`,
        headers: 
        {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    await fetch(`${url}/api/signup`, request)
        .then((request) => request.json())
        .then(async ( res ) => {
            const { error, token } = res;
            if(!error) {
                localStorage.setItem("auth:token", token);
                alert('Cadastrado com sucesso!');
                location.reload();
            } else {
                let msgErro = document.querySelector('.erro-registro');
                msgErro.innerHTML = '';
                
                Object.entries(error).forEach(item =>{
                    msgErro.innerHTML += `<p>- ${item[1].msg}</p>`;
                })
                
                msgErro.style.display = 'inline-block';

                setTimeout(() => {
                    msgErro.style.display = 'none';
                    msgErro.innerHTML = '';
                }, 4000)
            }
            
            
        })
}    


//Função de logar, disparada ao clicar no botão Login
async function logar() {
    let mail = document.querySelector('.logEmail').value;
    let password = document.querySelector('.logPass').value;

    const request = {
        method: 'POST',
        body: `email=${mail}&password=${password}`,
        headers: 
        {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    let response = await fetch(`${url}/api/signin`, request)
    let res = await response.json()
    const { error, token } = res;
    if(!error) {
        localStorage.setItem("auth:token", token);
        location.reload();
    } else {
        let msgErro = document.querySelector('.erro-login');
        msgErro.innerHTML = '';
        
        Object.entries(error).forEach(item =>{
            msgErro.innerHTML += `<p>- ${item[1].msg}</p>`;
        })
        
        msgErro.style.display = 'inline-block';

        setTimeout(() => {
            msgErro.style.display = 'none';
            msgErro.innerHTML = '';
        }, 4000)
    }
}

//Função de deslogar
function deslogar() {
    localStorage.removeItem("auth:token");
    location.reload();
}