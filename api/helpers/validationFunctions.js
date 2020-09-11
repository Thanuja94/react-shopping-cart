var validator = require("email-validator");


module.exports = {

    validEmail: (email) => {

        if(validator.validate(email)){
            return true
        }
        return false
    }
}