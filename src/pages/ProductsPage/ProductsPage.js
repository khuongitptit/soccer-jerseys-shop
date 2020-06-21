import React from 'react'
import ProductItem from '../../components/ProductItem/ProductItem'
import { Pagination } from 'antd'
const ProductsPage = props => {
    const { products } = props
    const displayProducts = products => {
        return products.map((product, index) => {
            return (
                <div>
                    <ProductItem key={index} product={product} />
                </div>
            )
        })
    }
    const onPageChange = page => {
        props.onPageChange(page)
    }
    return (
        <div className="products-container">
            <div className="content">{displayProducts(products)}</div>
            <div className="pagination">
                <Pagination
                    defaultCurrent={1}
                    hideOnSinglePage
                    pageSize={1}
                    responsive
                    total={50}
                    onChange={onPageChange}
                />
            </div>
        </div>
    )
}

export default ProductsPage
