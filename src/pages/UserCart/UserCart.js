import React from 'react'
import './UserCart.scss'
import { Tooltip, Button, Popconfirm } from 'antd'
const UserCart = props => {
    const { userCart, handleDeleteFromCart, handleBuy } = props
    const mapCartItems = () => {
        if (!!userCart) {
            return userCart.map((item, index) => {
                return (
                    <>
                        <tr key={index}>
                            <td key="image">
                                <Tooltip
                                    title={
                                        <div>
                                            <img
                                                className="logo"
                                                alt="logo"
                                                src={item.product.symbol}
                                            />
                                            <p>
                                                {item.product.type === 'country'
                                                    ? `Áo ${item.product.country}`
                                                    : `Áo ${item.product.club} - ${item.product.league}`}
                                            </p>
                                        </div>
                                    }
                                    placement="left"
                                >
                                    <img
                                        className="image"
                                        alt="Hinh anh san pham"
                                        src={item.product.img}
                                    />
                                </Tooltip>
                            </td>
                            <td key="price">
                                <span className="label"> Giá:</span>{' '}
                                <span className="value">
                                    {item.product.price} đ
                                </span>
                            </td>
                            <td key="customName">
                                <span>Tên tùy chọn:</span>{' '}
                                <span className="value">{item.customName}</span>
                            </td>
                            <td key="customNumber">
                                <span>Số tùy chọn:</span>{' '}
                                <span className="value">
                                    {item.customNumber}
                                </span>
                            </td>
                            <td key="quantity">
                                <span>Số lượng:</span>{' '}
                                <span className="value">{item.quantity}</span>
                            </td>
                            <td key="delete">
                                <Popconfirm
                                    title="Xác nhận xóa khỏi giỏ hàng?"
                                    onConfirm={() =>
                                        handleDeleteFromCart(item.product.id)
                                    }
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <Button type="danger">
                                        <i className="fas fa-trash-alt"></i>{' '}
                                        <span
                                            className="label"
                                            style={{ marginLeft: '3px' }}
                                        >
                                            Xóa
                                        </span>
                                    </Button>
                                </Popconfirm>
                            </td>
                            <td key="buy">
                                <Button
                                    type="primary"
                                    onClick={() => handleBuy(item)}
                                >
                                    <i className="fas fa-money-bill"></i>{' '}
                                    <span
                                        className="label"
                                        style={{ marginLeft: '3px' }}
                                    >
                                        Mua
                                    </span>
                                </Button>
                            </td>
                        </tr>
                    </>
                )
            })
        } else {
            return <div className="loading">Loading...</div>
        }
    }
    return !!userCart && userCart.length ? (
        <div className="cart-items">
            <table>{mapCartItems()}</table>
        </div>
    ) : (
        <div className="empty-cart">
            <h1>Giỏ hàng của bạn hiện chưa có sản phẩm nào</h1>
        </div>
    )
}

export default UserCart
