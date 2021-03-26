const router =require('express').Router();

const {login, signup} = require('../controllers/auth');

const {signupValidationRules, loginValidationRules, validate} = require('../helper/validation');

router.post('/signup', signupValidationRules(), validate, signup);
router.post('/login',loginValidationRules(), validate, login);

module.exports = router;