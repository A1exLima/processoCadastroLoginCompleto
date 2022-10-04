const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//---------------------------------------------------------
//MIDDLEWARES

//middleware para bloquear rotas caso o usuário esteja logado
const loggedUsed = require("..//middlewares/loggedUsed");
//middleware para bloquear rotas caso o usuário NAO esteja logado
const logoutUsed = require("..//middlewares/logoutUsed");
//
const multerDiskStorage = require('..//middlewares/multerDiskStorage');
const upload = multer({storage: multerDiskStorage});

//------------------------------------------------------------//

const { body } = require('express-validator');

const validations = [
    body("name")
        .notEmpty().withMessage("O Nome deve ser preenchido").bail()
        .trim().bail()
        .isLength({min:3}).withMessage("O Nome deve conter no mínimo 3 caracteres").bail(),
    body("email")
        .notEmpty().withMessage("O E-mail deve ser preenchido").bail()
        .trim().bail()
        .normalizeEmail().bail()
        .isEmail().withMessage("Deve preencher com um E-mail válido").bail(),
    body("password")
        .notEmpty().withMessage("A Senha deve ser preenchida").bail()
        .isLength({min:5}).withMessage("A Senha deve conter no mínimo 5 caracteres").bail()
        .trim(),
    body("imageUser").custom((value, {req}) => {
        
        let file = req.file;
        let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

        if(!file) {

            throw new Error ('A imagem deve ser carregada');
        } else{

            let fileExtension = path.extname(file.originalname);
        
            if(!acceptedExtensions.includes(fileExtension)){

                throw new Error (`Tipo de arquivos permitidos são: ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
];
    
//---------------------------------------------------------
const ControllerUser = require('../controllers/ControllerUser');

router.get("/", ControllerUser.home);

//----------------------------

router.get('/registration', loggedUsed, ControllerUser.registration);

router.post('/registration', upload.single('imageUser') , validations , ControllerUser.processRegistration);

//----------------------------

router.get('/login', loggedUsed, ControllerUser.login);

router.post('/login', ControllerUser.processlogin);
//---------------------------------------------------------

router.get('/profile', logoutUsed, ControllerUser.profile);

router.get('/logout', logoutUsed, ControllerUser.logout);

module.exports = router;