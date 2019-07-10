import microValidator from 'micro-validator'

function contactValidation (data) {
  const errors = microValidator.validate({
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
export default contactValidation
