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

            //Verificacao do email se ja existe no banco de dados se sim, bloqueia o registro e informa ao usuário que ja foi registrado o email e pede para inserir um email diferente.
            let UserExists = User.findUsersByField('email', req.body.email);

            if(UserExists){
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
            
            //Caminho da imagem do usuário salvo
            let pathImgUser = path.join("images","imageUser", req.file.filename);

            res.render("confRegister.ejs", { imgUser: pathImgUser});
        }    
    },

    login: (req, res) => {
        res.render('login.ejs');
    },

    processlogin: (req, res) => {
        res.send('FORM LOGIN')
    }
}