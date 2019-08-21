import microValidator from 'micro-validator'

function adminModalValidation (data) {
    const errors = microValidator.validate({
        FirstName : {
            required: {
                errorMsg: 'First Name is required'
            }
        },
        LastName : {
            required: {
                errorMsg: 'Last Name is required'
            }
        },
        Password : {
            required: {
                errorMsg: 'Password is required'
            }
        },
        Email : {
            required: {
                errorMsg: 'Email is required'
            },
            email: {
                errorMsg: `Enter a valid email`
            }
        },
        // tags : {
        //     required: {
        //         errorMsg: 'Type is required'
        //     }
        // }
    }, data)
    return errors
}
export default adminModalValidation