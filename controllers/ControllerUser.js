const { validationResult } = require('express-validator');

module.exports = {

    registration: (req, res) =>{

        res.render('userRegister.ejs', {uploadImg: true});
    },

    processRegistration: (req, res) =>{

        let erros = validationResult(req);
            
        if(!erros.isEmpty() || req.file == undefined){

            return res.render('userRegister.ejs', { erros: erros.mapped(), old: req.body, uploadImg: false});

        } else{

            res.send("CADASTRO EFETUADO COM SUCESSO");
        }    
    } 
}