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
  let user = JSON.parse(localStorage.getItem('user'))
  let { Type = '' } = user || {}
  if (Type !== 'user' && Type !== 'admin') {
    props.history.push('/')
  }
}
