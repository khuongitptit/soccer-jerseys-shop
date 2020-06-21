import React, { useEffect, useState } from 'react'
import { actionFetchProductsRequest } from '../actions/index'
import { connect } from 'react-redux'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import { withRouter } from 'react-router-dom'
import firebase from '../firebaseConfig/index'
const firestore = firebase.firestore()
const ProductsContainer = props => {
    const classify = props.classify
    const category = props.match.params.category
    const { products, fetchProducts } = props
    const [page, setPage] = useState(1)
    useEffect(() => {
        fetchProducts(classify, category)
    }, [classify, category])
    const onPageChange = page => {
        setPage(page)
    }
    const getProductsByPage = () => {
        const itemsPerPage = 15
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const productsByPage = products.slice(startIndex, endIndex)
        return productsByPage
    }
    return (
        <ProductsPage
            products={getProductsByPage()}
            onPageChange={onPageChange}
        />
    )
}
const mapStateToProps = state => {
    return {
        products: state.products,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: (classify, category) => {
            dispatch(actionFetchProductsRequest(classify, category))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProductsContainer))
