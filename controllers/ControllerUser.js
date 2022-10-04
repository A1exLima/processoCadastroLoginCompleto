const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const path = require("path");

module.exports = {
    
    home: (req, res) => {

        res.render('home.ejs');

    },

    registration: (req, res) =>{

        res.render('userRegister.ejs');
    },

    processRegistration: (req, res) =>{

        let erros = validationResult(req);
            
        if(!erros.isEmpty()){

            return res.render('userRegister.ejs', { erros: erros.mapped(), old: req.body});

        } else{

            //Verificacao do email se ja existe no banco de dados. Se sim, bloqueia o registro e informa ao usuário que ja foi registrado e pede para inserir um email diferente.
            let UserEmailExists = User.findUsersByField('email', req.body.email);

            if(UserEmailExists){
                return res.render('userRegister.ejs', { erros: {email: {msg: "Esse e-mail já está registrado, insira um novo e-mail"}}, old: req.body});

            }

            // Concatena informacoes do form com password, como nao pode ter dois paramentos iguais, o sistema rescreve esse parametro pegando como valido o ultimo parametro e executa um hash no password.
            let UserToCreate = {
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename
            }

            //Funcao Model para Salvar usuário no banco de dados
            User.create(UserToCreate);
            
            return res.redirect('/login');
        }    
    },

    login: (req, res) => {
        res.render('login.ejs');
    },

    processlogin: (req, res) => {

        // Busca os dados do req.body método post e destruta em variaveis
        let {email, password} = req.body;

        // Localiza o usuário pelo email se encontrar traz do banco de dados JSON todas as informacoes do usuário encontrado, c aso nao encontre retorna Undefined
        let userToLogin = User.findUsersByField('email', email);

        //Verifica se a variavel possui dados se NAO indica que o email nao foi encontrado e informa para digitar um email valido. Se sim faz a segunda etapa de verificacao que é confirmar se a senha digitada esta correta, se sim confirma que o usuario está logado rederizando a página de confirmacao, se nao, informa que a senha esta incorreta e solicita que o mesmo digite uma senha válida
        if(!userToLogin){

            return res.render('login.ejs', { erros: {email: {msg: "E-mail não registrado, insira um e-mail válido"}}, old: req.body});

        } else{
            
            let passwordVerification = bcrypt.compareSync(password, userToLogin.password);

            if(passwordVerification){

                //Por seguranca retiramos a variavel senha antes de salvar na sessions
                delete userToLogin.password;

                //Sessions( Salva informacoes do usuário do lado do servidor)
                req.session.userLogged = userToLogin;

                //Redireciona para pagina de usuário logado (profile)
                res.redirect("/profile");

            } else{

                return res.render('login.ejs', { erros: {password: {msg: "Senha incorreta, digite uma senha válida"}}, old: req.body});

            } 
        }   
    },

    profile: (req, res) =>{

        //Destruturacao da sessions que contem informacoes do usuário logado
        let {avatar, name} = req.session.userLogged;

        //Caminho da imagem do usuário salvo
        let pathImgUser = path.join("images","imageUser", avatar);

        res.render("profile.ejs", {imgUser: pathImgUser, nameUser: name});
        
    },

    logout: (req, res) => {

        req.session.destroy();

        res.redirect("/");
    }
}

