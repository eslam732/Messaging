const {check, validationResult} = require('express-validator');


const signupValidationRules = () => {
    return [
       
        check('password').trim().isLength({min:6}),
        check('fullName').trim().isString().isLength({min:4}),
        
        check('email').notEmpty().isEmail(),
    ]
}


const loginValidationRules = ()=>{
    return [
        check('email').notEmpty().isEmail(),
        check('password').trim().isLength({min:6})
    ]
}



const validate = (req, res, next) =>{
    const errors = validationResult(req);
    
    // If No Errors 
    if (errors.isEmpty()) {
        return next();
    }

    // Catch  errors!!
    
    const exractedErrors = [];
    
    errors.array().map(err=> exractedErrors.push({[err.param] : err.msg}));

    res.status(422).json({
        errors: exractedErrors
    });
}

module.exports = {
    signupValidationRules,
    loginValidationRules,
    validate
}