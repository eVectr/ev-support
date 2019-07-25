export const filterArray = (arr, key, searchTerm) =>
  arr.filter(
    val =>
      val[key] ? (val[key]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim()) || searchTerm === '') : false
  )

export let authRoutes = (props) => {
  let user = JSON.parse(localStorage.getItem('user'))
  let { Type = '' } = user || {}
  if (Type !== 'user' && Type !== 'admin') {
    props.history.push('/')
  }
}
