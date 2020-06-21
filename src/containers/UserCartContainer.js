import React, { useEffect } from 'react'
import UserCart from '../pages/UserCart/UserCart'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    actionDeleteFromCartRequest,
    actionBuyProductRequest,
} from '../actions/index'
import { Modal, Tooltip, message } from 'antd'
const UserCartContainer = props => {
    const userId = props.match.params.userId
    const { history } = props
    const { userCart, onDeleteCartItem, buyProduct } = props
    useEffect(() => {
        if (userCart) {
            console.log(userCart)
        }
    }, [userCart])
    const handleDeleteFromCart = productId => {
        onDeleteCartItem(userId, productId)
    }
    const handleBuy = item => {
        confirmModal(item)
    }
    const confirmModal = item => {
        const { product, customName, customNumber, quantity } = item
        Modal.confirm({
            title: 'Xác nhận mua hàng',
            content: (
                <div>
                    <Tooltip
                        title={
                            <div>
                                <img
                                    className="logo"
                                    alt="logo"
                                    src={product.symbol}
                                />
                                <p>
                                    {product.type === 'country'
                                        ? `Áo ${product.country}`
                                        : `Áo ${product.club} - ${product.league}`}
                                </p>
                            </div>
                        }
                        placement="left"
                    >
                        <img
                            className="image"
                            alt="Hinh anh san pham"
                            src={product.img}
                        />
                    </Tooltip>
                    <div className="customName">
                        Tên tùy chọn:{' '}
                        <span className="value">{customName}</span>
                    </div>
                    <div className="customNumber">
                        Số tùy chọn:{' '}
                        <span className="value">{customNumber}</span>
                    </div>
                    <div className="quantity">
                        Số lượng: <span className="value">{quantity}</span>
                    </div>
                    <div className="price">
                        Giá: <span className="value">{product.price} vnđ</span>
                    </div>
                    <div className="total-pay">
                        <h4>
                            Tổng tiền:{' '}
                            <span className="total">
                                {product.price * quantity} vnđ
                            </span>
                        </h4>
                    </div>
                </div>
            ),
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: () => {
                buyProduct(userId, {
                    product: product,
                    customName: customName,
                    customNumber: customNumber,
                    quantity: quantity,
                })
                localStorage.setItem('customName', '')
                localStorage.setItem('customNumber', '')
                message.success({ content: 'Đặt hàng thành công' })
                history.push('/')
            },
            className: 'modal-buy-product',
        })
    }
    return (
        <UserCart
            userCart={userCart}
            handleDeleteFromCart={handleDeleteFromCart}
            handleBuy={handleBuy}
        />
    )
}
const mapStateToProps = state => {
    return {
        userCart: state.userCart,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onDeleteCartItem: (userId, productId) => {
            dispatch(actionDeleteFromCartRequest(userId, productId))
        },
        buyProduct: (userId, item) => {
            dispatch(actionBuyProductRequest(userId, item))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UserCartContainer))
