const express = require('express');
const router = express.Router();
const multer = require('multer');

const multerDiskStorage = require('..//middlewares/multerDiskStorage');
const upload = multer({storage: multerDiskStorage});

//------------------------------------------------------------//

const { body } = require('express-validator');

const validations = [
    body("name")
        .notEmpty().withMessage("O Nome deve ser preenchido").bail()
        .isLength({min:3}).withMessage("O Nome deve conter no mínimo 3 caracteres"),
    body("email")
        .notEmpty().withMessage("O E-mail deve ser preenchido").bail()
        .isEmail().withMessage("Deve preencher com um E-mail válido"),
    body("password")
        .notEmpty().withMessage("A Senha deve ser preenchida").bail()
        .isLength({min:5}).withMessage("A Senha deve conter no mínimo 5 caracteres")
];
    
//---------------------------------------------------------

const ControllerUser = require('../controllers/ControllerUser');
router.get('/registration', ControllerUser.registration);

router.post('/registration', upload.single('imageUser') , validations , ControllerUser.processRegistration);

//---------------------------------------------------------

module.exports = router;