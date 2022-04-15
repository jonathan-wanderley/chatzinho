

<h1 align="center">
     💬 <a href="https://chatzinho-v1.herokuapp.com/" alt="site do chatzinho"> Chatzinho </a>
</h1>

<h3 align="center">
    Chatzinho é um sistema de chats desenvolvido com NodeJs, Socket.IO e MongoDB 💜
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jonathan-wanderley/chatzinho?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/jonathan-wanderley/chatzinho">
  
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/jonathan-wanderley/chatzinho">
    
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  <img alt="Stars" src="https://img.shields.io/github/stars/jonathan-wanderley/chatzinho?style=social">

  <a href="https://github.com/jonathan-wanderley">
    <img alt="Feito por Jonathan" src="https://img.shields.io/badge/feito%20por-Jonathan-%237519C1">
  </a>
  
</p>

<!-- <h4 align="center">
	🚧   Concluído 🚀 🚧
</h4> -->

Tabela de conteúdos
=================
<!--ts-->
   * [Funcionalidades](#-funcionalidades)
   * [Layout](#-layout)
     * [Web](#web)
     * [Mobile](#mobile)
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando o Projeto](#user-content--rodando-o-projeto)
   * [Tecnologias](#-tecnologias)
     * [WebSite](#user-content-website--javascript)
     * [Server](#user-content-server--nodejs----mongodb)
   * [Como contribuir no projeto](#-como-contribuir-no-projeto)
   * [Autor](#-autor)
   * [Licença](#user-content--licença)
<!--te-->


## ⚙️ Funcionalidades

- [x] Visual moderno com tema Dark Violet
- [x] Site 100% responsivo, rodando em todos os tamanhos de tela
- [x] Chat público para os usuários conversarem a vontade 
- [x] Os usuarios podem se cadastrar no site informando:
  - [x] Nickname
  - [x] Email
  - [X] Senha 
- [x] Os usuários podem logar no site informando:
  - [x] Email
  - [X] Senha 
- [x] Apenas usuarios registrados no site tem acesso ao chat privado
- [x] Usuarios registrados tem seu nick reservado, assim nenhum outro user consegue ter esse mesmo nick


---

## 🎨 Layout

A paleta de cores criada está disponivel [aqui](https://coolors.co/121212-1f1f1f-282829-503383-604196-6d48ae-e9fe37)


### Web

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="https://i.ibb.co/VYpYnvv/desktop-index.png" width="49%">

  <img alt="NextLevelWeek" title="#NextLevelWeek" src="https://i.ibb.co/ZRj9Sh2/desktop-chat.png" width="49%">
</p>

### Mobile

<p align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="https://i.ibb.co/GRc9d9N/mobile-index.png" width="250px">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="https://i.ibb.co/Qfmg87h/mobile-chat.png" width="250px">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="https://i.ibb.co/R3FhLxF/chat-users.png" width="250px">
</p>

---

## 🚀 Como executar o projeto

💡 Este projeto já tem frontend e backend integrados! Ao iniciar o servidor os dois funcionam corretamente.

Os arquivos HTML estão na pasta views rodando por meio do template engine EJS do Node e o restante dos arquivos de frontend ficam na pasta Public.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o projeto

```bash

# Clone este repositório
$ git clone https://github.com/jonathan-wanderley/chatzinho.git

# Acesse a pasta do projeto no terminal/cmd
$ cd chatzinho

# Instale as dependências
$ npm install

# Use o arquivo .env.example para configurar suas variaveis de ambiente
# Você pode apenas renomear o arquivo .env.example para .env e configurar os campos PORT, MONGO_URL e JWT_SECRET

# No campo PORT digite a porta que você deseja que o servidor/site use, por padrão deixei na porta 3000

# No campo MONGO_URL você coloca a url do seu banco de dados MongoDB
# O modelo padrão de URL MongoDB é esse: mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
# Você pode consultar mais detalhes aqui nesse link: https://www.mongodb.com/docs/manual/reference/connection-string/

# No campo JWT_SECRET você cria sua chave secreta para a autenticação com JWT funcionar corretamente
# Caso esteja com duvidas você pode conseguir mais detalhes nesse link: https://jwt.io/introduction

# Após configurar é só salvar seu arquivo .env com suas variaveis de ambiente

# Agora execute a aplicação
$ npm run start

# O servidor inciará na porta configurada no arquivo .env
# Acesse http://localhost:3000

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([Javascript](https://www.javascript.com/try))

-   **[Socket.IO](https://socket.io/)**

> Veja o arquivos de javascript na pasta Public

#### **Server**  ([NodeJS](https://nodejs.org/en/)  +  [MongoDB](https://www.mongodb.com/pt-br))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[Express-validator](https://express-validator.github.io/docs/)**
-   **[Bcrypt](https://www.npmjs.com/package/bcrypt)**
-   **[EJS](https://ejs.co/)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[JsonWebToken](https://jwt.io/)**
-   **[Mongoose](https://mongoosejs.com/)**
-   **[Socket.IO](https://socket.io/)**

> Veja o arquivo  [package.json](https://github.com/jonathan-wanderley/chatzinho/blob/main/package.json)



#### **Utilitários**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Fontes:  **[Carter One](https://fonts.google.com/specimen/Carter+One?query=carter+one)**,  **[Open Sans](https://fonts.google.com/specimen/Open+Sans?query=open+sans)** e **[Montserrat](https://fonts.google.com/specimen/Montserrat)**
-   Interface para MongoDB: **[MongoDB](https://www.mongodb.com/pt-br/products/compass)** 


---


## 💪 Como contribuir no projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---

## 🦸 Autor


 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/97256161?v=4" width="100px;" alt=""/>
 <sub><b>Jonathan Wanderley</b></sub> 🚀

[![Gmail Badge](https://img.shields.io/badge/-jonathan.wpc@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jonathan.wpc@gmail.com)](mailto:jonathan.wpc@gmail.com)

---

## 📝 Licença

Este projeto esta sobre a licença [MIT](./LICENSE).

Feito com 💜 por Jonathan Wanderley 👋🏽 [Entre em contato!](https://www.linkedin.com/in/jonathan-wanderley/)

---
