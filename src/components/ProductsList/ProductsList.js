import React from 'react'
import './ProductsList.scss'
import { Pagination } from 'antd'
const ProductsList = props => {
    const { children, onPageChange } = props
    return (
        <div>
            <div className="products-list">{children}</div>
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

export default ProductsList
