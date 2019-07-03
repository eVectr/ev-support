const filterArray = (arr, key, searchTerm) =>
arr.filter(
    val =>
         val[key]
            .toString()
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase().trim()
            ) || searchTerm === ''
)

export default filterArray