function loggedUserData (req, res, next){

    res.locals.isLogged = false;

    if(req.session.userLogged){

        res.locals.isLogged = true;
        
        let usedlogged = req.session.userLogged;

        const path = require("path");

        //Caminho da imagem do usuário salvo
        let pathImgUser = path.join("images","imageUser", usedlogged.avatar);

        res.locals.pathImgUser = pathImgUser;
    }
    

    next();
}

module.exports = loggedUserData;