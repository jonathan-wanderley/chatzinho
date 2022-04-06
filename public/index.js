const url = 'http://localhost:3000';

async function exec() {
    const request = {
        method: 'POST',
        body: `token=${localStorage.getItem("auth:token")}`,
        headers: 
        {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
    await fetch(`${url}/auth`, request)
        .then((request) => request.json())
        .then((resposta) => {
            const { notallowed } = resposta;

            if(!notallowed) { //LOGADO
                document.querySelector('.div-do-botao p').innerText = '*Você está logado!';
                document.querySelector('.div-do-botao').style.display = 'flex'
                document.querySelector('.container').style.display = 'none';
                // window.location.href = "/chat.html"
            } else {  //NEGADA
                document.querySelector('.div-do-botao p').innerText = '';
                document.querySelector('.div-do-botao').style.display = 'none';
                document.querySelector('.container').style.display = 'block';
            }
        })
}
exec();



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
    await fetch(`${url}/signup`, request)
        .then((request) => request.json())
        .then(( res ) => {
            const { error, token } = res;
            if(!error) {
                localStorage.setItem("auth:token", token);
                alert('Cadastrado com sucesso!');
                location.reload();
            } else {
                alert(error);
            }
            
            
        })
}    



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

    let response = await fetch(`${url}/signin`, request)
    let res = await response.json()
    const { error, token, email } = res;
    if(!error) {
        localStorage.setItem("auth:token", token);
        alert('Logado com sucesso!')
        location.reload();
    } else {
        alert('Não foi possivel realizar login :c')
    }
}


function deslogar() {
    localStorage.removeItem("auth:token");
    location.reload();
}