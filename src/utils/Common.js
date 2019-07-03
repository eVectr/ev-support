export const filterArray = (arr, key, searchTerm) =>
arr.filter(
    val =>
         val[key]
            .toString()
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase().trim()
            ) || searchTerm === ''
)

export let authRoutes = (props) => {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user, 'user')
        let { _id = '', Type = '' } = user || {}
        console.log(Type)
        console.log(Type !== 'user', 'user check')
        console.log(Type !== 'admin', 'admin check')

        if (Type != 'user' && Type != 'admin') {
            props.history.push('/')
        }
        
       
}

