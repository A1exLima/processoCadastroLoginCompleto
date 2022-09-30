const express = require('express');
const router = express.Router();

//---------------------------------------------------------

const ControllerUser = require('../controllers/ControllerUser');
router.get('/registration', ControllerUser.registration);

//---------------------------------------------------------

module.exports = router;