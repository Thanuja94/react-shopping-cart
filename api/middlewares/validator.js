const { body, validationResult } = require('express-validator');

const productValidationRules = () => {
  return [
    body('productName').isAlpha(), //checking if product name has only charactors      
    body('price').exists(),// checking if price is exist
    body('qty').isNumeric(), //checking if quantity value is numeric
    body('category').exists(),//checking if category is exist
    body('imagePath') //checking if imagePath is exist
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
  productValidationRules,
  validate,
}