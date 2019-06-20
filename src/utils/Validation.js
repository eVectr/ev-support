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
   }, data)

   return errors
}
export default Validation