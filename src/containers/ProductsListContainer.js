import React, { useEffect } from 'react'
import ProductsList from '../components/ProductsList/ProductsList'
import { connect } from 'react-redux'
import ProductItem from '../components/ProductItem/ProductItem'
import {
    actionFetchProductsRequest,
    actionChangePage,
    actionProductsLoading,
} from '../actions/index'
const ProductsListContainer = props => {
    const {
        products,
        filter,
        page,
        onPageChange,
        fetchProducts,
        productsLoading,
        setProductsLoading,
    } = props
    useEffect(() => {
        fetchProducts(filter, page)
    }, [page])
    useEffect(() => {
        if (!products.length) {
            setProductsLoading(true)
        }
    }, [products])
    const handlePageChange = page => {
        onPageChange(page)
    }
    const mapProducts = () => {
        return products.map((product, index) => {
            return <ProductItem key={index} product={product} />
        })
    }
    return (
        <ProductsList
            onPageChange={handlePageChange}
            productsLoading={productsLoading}
        >
            {mapProducts()}
        </ProductsList>
    )
}
const mapStateToProps = state => {
    return {
        products: state.products,
        filter: state.filter,
        page: state.page,
        productsLoading: state.productsLoading,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onPageChange: page => {
            dispatch(actionChangePage(page))
        },
        fetchProducts: (filter, page) => {
            dispatch(actionFetchProductsRequest(filter, page))
        },
        setProductsLoading: productsLoading => {
            dispatch(actionProductsLoading(productsLoading))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsListContainer)
