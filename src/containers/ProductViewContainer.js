import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import ProductView from '../pages/ProductView/ProductView'
import firebase from '../firebaseConfig/index'
import { connect } from 'react-redux'
import {
    actionAddToCartRequest,
    actionBuyProductRequest,
} from '../actions/index'
import { Modal, Tooltip, Divider, message } from 'antd'
const db = firebase.firestore()
const ProductViewContainer = props => {
    const productId = props.match.params.productId
    const { userAccount, addToCart, buyProduct } = props
    const { history } = props
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [custom, setCustom] = useState({
        customName: localStorage.getItem('customName'),
        customNumber: localStorage.getItem('customNumber'),
    })
    const { customName, customNumber } = custom
    const handleDecreaseQuantity = () => {
        setQuantity(quantity - 1)
    }
    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    const handleChangeQuantity = e => {
        setQuantity(Number(e.target.value))
    }
    const handleCustomNameChange = e => {
        setCustom({
            ...custom,
            customName: e.target.value,
        })
        localStorage.setItem('customName', e.target.value)
    }
    const handleCustomNumberChange = e => {
        setCustom({
            ...custom,
            customNumber: e.target.value,
        })
        localStorage.setItem('customNumber', e.target.value)
    }
    const onClickCustomName = () => {
        setCustom({ ...custom, customName: '' })
    }
    const onClickCustomNumber = () => {
        setCustom({ ...custom, customNumber: '' })
    }
    const handleAddToCart = () => {
        if (!userAccount.id) {
            Modal.warning({
                title: 'Bạn phải đăng nhập để sử dụng giỏ hàng',
                okText: 'Đăng nhập ngay',
                cancelText: 'Hủy',
                onOk: () => {
                    history.push('/signin')
                    localStorage.setItem('prevSignIn', 'productDetail')
                },
            })
        } else {
            addToCart(
                userAccount.id,
                productId,
                quantity,
                customName,
                customNumber
            )
            localStorage.setItem('customName', '')
            localStorage.setItem('customNumber', '')
            message.success({ content: 'Đã thêm sản phẩm vào giỏ hàng' })
        }
    }
    const handleBuyNow = () => {
        if (!userAccount.id) {
            Modal.warning({
                title: 'Bạn phải đăng nhập để mua hàng',
                okText: 'Đăng nhập ngay',
                cancelText: 'Hủy',
                onOk: () => {
                    history.push('/signin')
                    localStorage.setItem('prevSignIn', 'productDetail')
                },
            })
        } else {
            confirmModal()
            // buyProduct(userAccount.id, {
            //     product: product,
            //     customName: custom.customName,
            //     customNumber: custom.customNumber,
            //     quantity: quantity,
            // })
            // localStorage.setItem('customName', '')
            // localStorage.setItem('customNumber', '')
        }
    }
    const confirmModal = () => {
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
                        <img className="image" alt="logo" src={product.img} />
                    </Tooltip>
                    <div className="customName">
                        Tên tùy chọn:{' '}
                        <span className="value">{custom.customName}</span>
                    </div>
                    <div className="customNumber">
                        Số tùy chọn:{' '}
                        <span className="value">{custom.customNumber}</span>
                    </div>
                    <div className="quantity">
                        Số lượng: <span className="value">{quantity}</span>
                    </div>
                    <div className="price">
                        Giá: <span className="value">{product.price} vnđ</span>
                    </div>
                    <Divider />
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
                buyProduct(userAccount.id, {
                    product: product,
                    customName: custom.customName,
                    customNumber: custom.customNumber,
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
    useEffect(() => {
        if (productId) {
            db.collection('products')
                .doc(productId)
                .get()
                .then(res => {
                    setProduct({
                        id: res.id,
                        ...res.data(),
                    })
                })
        }
    }, [])
    return (
        <ProductView
            product={product}
            quantity={quantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleChangeQuantity={handleChangeQuantity}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
            handleCustomNameChange={handleCustomNameChange}
            handleCustomNumberChange={handleCustomNumberChange}
            custom={custom}
            onClickCustomName={onClickCustomName}
            onClickCustomNumber={onClickCustomNumber}
        />
    )
}
const mapStateToProps = state => {
    return {
        userAccount: state.userAccount,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (userId, productId, quantity, customName, customNumber) => {
            dispatch(
                actionAddToCartRequest(
                    userId,
                    productId,
                    quantity,
                    customName,
                    customNumber
                )
            )
        },
        buyProduct: (userId, item) => {
            dispatch(actionBuyProductRequest(userId, item))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProductViewContainer))
