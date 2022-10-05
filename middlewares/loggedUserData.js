// requisicao do model para pesquisar o email do usuario e retornar todos dados encontrados desse mesmo usuario
let User = require('../models/User');

function loggedUserData (req, res, next){

    res.locals.isLogged = false;

    //Busca o email do usuario logado salvo no lado do cliente (cookie)
    let emailInCookie = req.cookies.infUsedLoggedEmail;

    // Pesquisa o email salvo no cookie no banco de dados e retorna todas as informacoes do usuário encontrado
    let userFromCookie = User.findUsersByField('email', emailInCookie);

    //Verifica se usuário esta logado e passa as informacoes para o lado do servidor
    if(userFromCookie){

        //Por seguranca retiramos a variavel senha antes de salvar na sessions
        delete userFromCookie.password;

        //passa as informacoes encontradas no banco de dados para o lado do servidor
        req.session.userLogged = userFromCookie;

        console.log(req.session.userLogged);
    }

    if(req.session.userLogged){

        res.locals.isLogged = true;
        
        let usedlogged = req.session.userLogged;

        const path = require("path");
        pathImgUser = path.join("images","imageUser", usedlogged.avatar);

        res.locals.pathImgUser = pathImgUser;
    }

    next();
}

module.exports = loggedUserData;