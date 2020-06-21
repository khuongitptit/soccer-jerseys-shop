import React, { useEffect } from 'react'
import { Tooltip, Button, Radio } from 'antd'
import './PurchaseHistory.scss'
import { Link } from 'react-router-dom'
const PurchaseHistory = props => {
    const { purchaseHistory, onChangeSort, sort } = props
    useEffect(() => {
        if (!!purchaseHistory) {
            console.log(purchaseHistory)
        }
    }, [purchaseHistory])
    const mapPurchaseHistory = () => {
        if (!!purchaseHistory) {
            return purchaseHistory.map((item, index) => {
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
                                                src={
                                                    item.buyItem.product.symbol
                                                }
                                            />
                                            <span>
                                                {item.buyItem.product.type ===
                                                'country'
                                                    ? `Áo ${item.buyItem.product.country}`
                                                    : `Áo ${item.buyItem.product.club} - ${item.buyItem.product.league}`}
                                            </span>
                                        </div>
                                    }
                                    placement="left"
                                >
                                    <img
                                        className="image"
                                        alt="Hình ảnh sản phẩm"
                                        src={item.buyItem.product.img}
                                    />
                                </Tooltip>
                            </td>
                            <td key="price">
                                <span className="label">Giá:</span>{' '}
                                <span className="value">
                                    {item.buyItem.product.price} đ
                                </span>
                            </td>
                            <td key="customName">
                                Tên tùy chọn:{' '}
                                <span className="value">
                                    {item.buyItem.customName}
                                </span>
                            </td>
                            <td key="customNumber">
                                Số tùy chọn:{' '}
                                <span className="value">
                                    {item.buyItem.customNumber}
                                </span>
                            </td>
                            <td key="quantity">
                                Số lượng:{' '}
                                <span className="value">
                                    {item.buyItem.quantity}
                                </span>
                            </td>
                            <td key="time">
                                <span>
                                    <i className="far fa-clock"></i>
                                </span>
                                {'  '}
                                <span className="value">
                                    {item.day} | {item.time}
                                </span>
                            </td>
                            <td key="detail">
                                <Link to={`/${item.buyItem.product.id}/detail`}>
                                    <Button>
                                        <i className="fas fa-info-circle"></i>
                                        <span className="label">
                                            Chi tiết sản phẩm
                                        </span>
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    </>
                )
            })
        } else {
            return <div className="loading">Loading...</div>
        }
    }
    return !!purchaseHistory && purchaseHistory.length ? (
        <div className="purchase-history">
            <div className="sort">
                <Radio.Group onChange={onChangeSort} value={sort}>
                    <Radio value="newest">Gần đây nhất</Radio>
                    <Radio value="latest">Cũ nhất</Radio>
                </Radio.Group>
            </div>
            <table>{mapPurchaseHistory()}</table>
        </div>
    ) : (
        <div className="empty-history">
            <h1>Bạn chưa có lịch sử mua hàng</h1>
        </div>
    )
}

export default PurchaseHistory
