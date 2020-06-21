import React from 'react'
import { Badge } from 'antd'
import { Link, withRouter } from 'react-router-dom'
const ProductItem = props => {
    const { product } = props
    return (
        <div className="product-container">
            <Link to={`/${product.id}/detail`}>
                <div className="link-to-product">
                    <img
                        className="product-thumb"
                        alt="Hinh anh san pham"
                        src={product.img}
                    />
                    <img
                        className="symbol"
                        alt={product.type === 'country' ? 'flag' : 'logo'}
                        src={product.symbol}
                    />
                    <Badge
                        className="product-price"
                        count={`${product.price} đ`}
                    />
                </div>
            </Link>
        </div>
    )
}

export default withRouter(ProductItem)
