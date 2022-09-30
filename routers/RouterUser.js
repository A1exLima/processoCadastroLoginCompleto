const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerDiskStorage = require('..//middlewares/multerDiskStorage');
const upload = multer({storage: multerDiskStorage});

//---------------------------------------------------------

const ControllerUser = require('../controllers/ControllerUser');
router.get('/registration', ControllerUser.registration);

router.post('/registration', upload.single('imageUser'), ControllerUser.processRegistration);

//---------------------------------------------------------

module.exports = router;