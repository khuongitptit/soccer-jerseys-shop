import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Badge } from 'antd'
const { SubMenu, Item } = Menu
const MenuComponent = props => {
    const { userAccount, isSignedIn } = props
    const [isExpand, setIsExpand] = useState(false)
    const { userCart } = props
    const toggleExpand = () => {
        setIsExpand(!isExpand)
    }
    const closeMenu = () => {
        setIsExpand(false)
    }
    const signOut = () => {
        closeMenu()
        props.signOut()
    }
    return (
        <>
            <nav className="menu">
                <ul>
                    <li className="logo">
                        <Link to="/">
                            <div>
                                <img
                                    className="logo-link"
                                    alt="logo"
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/assets/logo.png'
                                    }
                                />
                            </div>
                        </Link>
                    </li>

                    <div className="social-media">
                        <li>
                            <a href="https://www.facebook.com/profile.php?id=100010175289960">
                                <i className="fab fa-facebook-square fa-2x"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/99_k.n.d/">
                                <i className="fab fa-instagram-square fa-2x"></i>
                            </a>
                        </li>
                    </div>

                    <div className="user-account">
                        <li>
                            <Menu mode="horizontal">
                                {isSignedIn ? (
                                    <SubMenu
                                        key="user-account"
                                        title={
                                            <span>
                                                <Badge
                                                    count={userCart.length}
                                                    style={{
                                                        backgroundColor:
                                                            '#f14444',
                                                    }}
                                                >
                                                    <i className="fas fa-user-circle fa-3x"></i>
                                                </Badge>
                                            </span>
                                        }
                                    >
                                        <Item key="edit">
                                            <Link
                                                to={`/${userAccount.id}/edit`}
                                            >
                                                <span>
                                                    <i className="fas fa-info"></i>{' '}
                                                    Cập nhật thông tin
                                                </span>
                                            </Link>
                                        </Item>
                                        <Item key="cart">
                                            <Link
                                                to={`/${userAccount.id}/cart`}
                                            >
                                                <span>
                                                    <i className="fas fa-shopping-cart"></i>{' '}
                                                    Giỏ hàng của bạn
                                                </span>
                                            </Link>
                                        </Item>
                                        <Item key="purchase-history">
                                            <Link
                                                to={`/${userAccount.id}/purchase-history`}
                                            >
                                                <span>
                                                    <i className="fas fa-history"></i>{' '}
                                                    Lịch sử mua hàng
                                                </span>
                                            </Link>
                                        </Item>
                                        <Item key="signout">
                                            <Link
                                                type="button"
                                                onClick={signOut}
                                            >
                                                <span>
                                                    <i className="fas fa-sign-out-alt"></i>{' '}
                                                    Đăng xuất
                                                </span>
                                            </Link>
                                        </Item>
                                    </SubMenu>
                                ) : (
                                    <Item key="signin">
                                        <Link to="/signin">
                                            <span>
                                                <i className="fas fa-sign-in-alt"></i>{' '}
                                                Đăng nhập
                                            </span>
                                        </Link>
                                    </Item>
                                )}
                            </Menu>
                        </li>
                    </div>
                    <div className="btn-menu">
                        <li>
                            <button onClick={toggleExpand}>
                                <i className="fas fa-bars fa-2x"></i>
                            </button>
                        </li>
                    </div>
                </ul>
            </nav>
            <div
                className="toggle-menu"
                style={{
                    display: isExpand ? 'inline-block' : 'none',
                }}
            >
                <div className="menu-content">
                    <ul>
                        {isSignedIn ? (
                            <>
                                <li>
                                    <Link
                                        to={`/${userAccount.id}/edit`}
                                        onClick={closeMenu}
                                    >
                                        <span>
                                            <i className="fas fa-info"></i>{' '}
                                            <span>Cập nhật thông tin</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/${userAccount.id}/cart`}
                                        onClick={closeMenu}
                                    >
                                        <span>
                                            <i className="fas fa-shopping-cart"></i>{' '}
                                            <span>Giỏ hàng của bạn</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/${userAccount.id}/purchase-history`}
                                        onClick={closeMenu}
                                    >
                                        <span>
                                            <i className="fas fa-history"></i>{' '}
                                            <span>Lịch sử mua hàng</span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={signOut}>
                                        <span>
                                            <i className="fas fa-sign-out-alt"></i>{' '}
                                            <span>Đăng xuất</span>
                                        </span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/signin" onClick={closeMenu}>
                                    <span>
                                        <i className="fas fa-sign-in-alt"></i>{' '}
                                        <span>Đăng nhập</span>
                                    </span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="close-btn" onClick={() => setIsExpand(false)}>
                    <button>
                        <i class="far fa-arrow-alt-circle-left fa-2x"></i>
                    </button>
                </div>
            </div>
        </>
    )
}
export default MenuComponent
