const { validationResult } = require('express-validator');

module.exports = {
    
    home: (req, res) => { 
        res.send('Página Home TESTE');
    },

    registration: (req, res) =>{

        res.render('userRegister.ejs');
    },

    processRegistration: (req, res) =>{

        let erros = validationResult(req);
            
        if(!erros.isEmpty()){

            return res.render('userRegister.ejs', { erros: erros.mapped(), old: req.body});

        } else{

            res.send("CADASTRO EFETUADO COM SUCESSO");
        }    
    },

    login: (req, res) => {
        res.render('login.ejs');
    },

    processlogin: (req, res) => {
        res.send('FORM LOGIN')
    }
}