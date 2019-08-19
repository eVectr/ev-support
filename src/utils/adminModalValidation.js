import microValidator from 'micro-validator'

function adminModalValidation (data) {
    const errors = microValidator.validate({
        first_name : {
            required: {
                errorMsg: 'First Name is required'
            }
        },
        last_name : {
            required: {
                errorMsg: 'Last Name is required'
            }
        },
        password : {
            required: {
                errorMsg: 'Password is required'
            }
        },
        email : {
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