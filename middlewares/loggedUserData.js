function loggedUserData (req, res, next){

    res.locals.isLogged = false;

    if(req.session.userLogged){

        res.locals.isLogged = true;
        
        usedlogged = req.session.userLogged;

        const path = require("path");
        pathImgUser = path.join("images","imageUser", usedlogged.avatar);

        res.locals.pathImgUser = pathImgUser;
    }

    next();
}

module.exports = loggedUserData;