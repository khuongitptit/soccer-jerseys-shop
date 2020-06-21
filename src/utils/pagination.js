export const getProductsByPage = (products, page) => {
    const itemsPerPage = 16
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const productsByPage = products.slice(startIndex, endIndex)
    return productsByPage
}
export const itemsPerPage = 16
export const startIndex = page => {
    const itemsPerPage = 16
    return (page - 1) * itemsPerPage
}
export const endIndex = startIndex => {
    const itemsPerPage = 16
    return startIndex + itemsPerPage - 1
}
