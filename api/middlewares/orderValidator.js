const { body, validationResult } = require('express-validator');

const orderValidationRules = () => {

  return [
    body('name').exists().isAlpha().isLength({ min: 5 }), // checking if not null ,all charactors,length > 5      
    body('total').exists(),// checking if total value exist 
    body('address').exists(), //checking if address exists
    body('lat').exists(),//checking if lat is exist
    body('long').exists() //checking if long is exist
          ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }  
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errorMessage: extractedErrors,
  })
}

module.exports = {
  orderValidationRules,
  validate,
}