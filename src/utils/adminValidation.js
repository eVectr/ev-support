import microValidator from 'micro-validator'

function adminValidation (data) {
  const errors = microValidator.validate({

    message: {
      required: {
        errorMsg: `Please enter Message`
      }
    }

  }, data)

  return errors
}
export default adminValidation
