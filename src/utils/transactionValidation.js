import microValidator from 'micro-validator'

function transactionValidation (data) {
  const errors = microValidator.validate({

    name: {
      required: {
        errorMsg: `Please Enter Name`
      }
    },

    promotionFeedback: {
      required: {
        errorMsg: `Promotion Feedback is Mandatory`
      }
    }

  }, data)

  return errors
}
export default transactionValidation
