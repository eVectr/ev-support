import microValidator from "micro-validator"

function Validation(data) {

   const errors = microValidator.validate({
    transaction_number: {
       required: {
         errorMsg: `Please enter Transaction Number`
       }
     },

     email: {
      required: {
          errorMsg: `Email is required`
      },
      email: {
          errorMsg: `Enter a valid email`
      }
  },

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

  message: {
    required: {
      errorMsg: `please enter message`
    }
  }

   }, data)

   return errors
}
export default Validation