import microValidator from "micro-validator"

function loginValidation(data) {

   const errors = microValidator.validate({
   
  username: {
    required: {
      errorMsg: `Please enter username`
    }
  },

  password: {
    required: {
      errorMsg: `Please enter password`
    }
  },

  }, data)

   return errors
}
export default loginValidation