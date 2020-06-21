import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Modal } from 'antd'
import './ProductView.scss'
const ProductView = props => {
    const { product } = props
    const [previewSettings, setPreviewSettings] = useState({
        images: '',
        visible: false,
        title: '',
    })
    const {
        quantity,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        handleChangeQuantity,
        handleAddToCart,
        handleBuyNow,
        handleCustomNameChange,
        handleCustomNumberChange,
        custom,
        onClickCustomName,
        onClickCustomNumber,
    } = props
    const { customName, customNumber } = custom
    const handlePreview = (image, index) => {
        setPreviewSettings({
            images: image,
            visible: true,
            title: index,
        })
    }
    const handleCloseModal = () => {
        setPreviewSettings({ ...previewSettings, visible: false })
    }
    const displaySlider = () => {
        const images = []
        if (!!product.img && !!product.detail_img) {
            images.push(product.img)
            product.detail_img.forEach(img => {
                images.push(img)
            })
        }
        const size = images ? (images.length > 1 ? images.length - 1 : 1) : 1
        if (!!images) {
            return (
                <Slider
                    arrows
                    dots
                    infinite
                    speed={500}
                    slidesToScroll={size}
                    slidesToShow={size}
                >
                    {images.map((image, index) => {
                        return (
                            <div key={index}>
                                <img
                                    src={image}
                                    alt={`img${index}`}
                                    className="image"
                                    onClick={() =>
                                        handlePreview(image, `img${index}`)
                                    }
                                />
                            </div>
                        )
                    })}
                </Slider>
            )
        } else
            return (
                <Slider slidesToShow={1}>
                    <div
                        style={{ width: '100%', backgroundColor: 'lightblue' }}
                    >
                        Loading ...
                    </div>
                </Slider>
            )
    }

    return (
        <div className="product-view">
            <div className="title">
                <span>
                    {product.type == 'country' ? (
                        <>
                            <img
                                className="symbol"
                                src={product.symbol}
                                alt="flag"
                            />{' '}
                            <p>{product.country}</p>
                        </>
                    ) : (
                        <>
                            <img
                                className="symbol"
                                src={product.symbol}
                                alt="logo"
                            />{' '}
                            <p>
                                {product.club} - {product.league}
                            </p>
                        </>
                    )}
                </span>
            </div>
            <div className="info">
                <div className="product-info">
                    <div className="images-slider">
                        {displaySlider()}

                        <Modal
                            visible={previewSettings.visible}
                            title={previewSettings.title}
                            onCancel={handleCloseModal}
                            footer={false}
                        >
                            <img
                                src={previewSettings.images}
                                alt={previewSettings.title}
                                width="100%"
                            />
                        </Modal>
                    </div>
                    <div className="price-desc">
                        <div className="price">
                            <button>
                                <i className="fas fa-coins"></i> {product.price}{' '}
                                <span
                                    style={{
                                        fontSize: '14px',
                                        color: 'black',
                                    }}
                                >
                                    đ
                                </span>
                            </button>
                        </div>
                        <p className="desc">{product.description}</p>
                    </div>
                    <div className="quantity">
                        <div className="group">
                            <button
                                onClick={handleDecreaseQuantity}
                                disabled={quantity === 1}
                            >
                                <i className="fas fa-minus "></i>
                            </button>
                            <input
                                value={quantity}
                                onChange={handleChangeQuantity}
                            />
                            <button onClick={handleIncreaseQuantity}>
                                <i className="fas fa-plus "></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="purchase-info">
                    <div className="name-custom">
                        <label htmlFor="name">Tên</label>
                        <input
                            name="name"
                            onChange={handleCustomNameChange}
                            value={customName}
                            onClick={onClickCustomName}
                        />
                    </div>
                    <div className="number-custom">
                        <label htmlFor="number">Số áo</label>
                        <input
                            name="number"
                            onChange={handleCustomNumberChange}
                            value={customNumber}
                            onClick={onClickCustomNumber}
                        />
                    </div>
                    <div className="action">
                        <div className="add-to-cart">
                            <button onClick={handleAddToCart}>
                                <i className="fas fa-cart-plus"></i> Thêm vào
                                giỏ hàng
                            </button>
                        </div>
                        <div className="buy-now">
                            <button onClick={handleBuyNow}>
                                <i className="fas fa-shopping-bag"></i> Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView
