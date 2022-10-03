const { validationResult } = require('express-validator');
const User = require('../models/User');

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

            //Funcao Model para Salvar usuário no banco de dados
            User.create(req.body);

            res.render("confRegister.ejs");
        }    
    },

    login: (req, res) => {
        res.render('login.ejs');
    },

    processlogin: (req, res) => {
        res.send('FORM LOGIN')
    }
}