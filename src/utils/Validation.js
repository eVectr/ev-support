import microValidator from 'micro-validator'

function Validation (data) {
  const errors = microValidator.validate({
    transaction_number: {
      required: {
        errorMsg: `Please enter Transaction number`
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

    message: {
      required: {
        errorMsg: `Please enter message`
      }
    }

  }, data)

  return errors
}
export default Validation
