const express = require('express');
const { login, registration, profile } = require('../controller/auth');
const router = express.Router();
const { validateRegisterRequest, isRequestValidated, validateLoginRequest } = require('../validators/auth');

/**
* @author Abhijeet Rathore
**/

router.post('/Login' ,validateLoginRequest ,isRequestValidated ,login);


router.post('/Registration',validateRegisterRequest, isRequestValidated,registration);


router.post('/Profile',profile);

module.exports = router;