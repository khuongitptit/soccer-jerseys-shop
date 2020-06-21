import React, { useEffect } from 'react'
import Menu from '../components/Menu/Menu'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
    actionFetchCartRequest,
    actionSignOutRequest,
    actionFetchPurchaseHistoryRequest,
} from '../actions/index'
import { message } from 'antd'
const MenuContainer = props => {
    const { userAccount, userCart, isSignedIn, signOut } = props
    const { history } = props
    //const { fetchCart, fetchPurchaseHistory } = props
    const onSignOut = () => {
        signOut()
        message.success({ content: 'Đã đăng xuất' })
        history.push('/')
    }
    // useEffect(() => {
    //     if (!!userAccount.id) {
    //         fetchCart(userAccount.id)
    //         fetchPurchaseHistory(userAccount.id)
    //     }
    // }, [userAccount])

    return (
        <Menu
            userCart={userCart}
            isSignedIn={isSignedIn}
            signOut={onSignOut}
            userAccount={userAccount}
        />
    )
}
const mapStateToProps = state => {
    return {
        userCart: state.userCart,
        isSignedIn: state.signedInStatus,
        userAccount: state.userAccount,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchCart: userId => {
            dispatch(actionFetchCartRequest(userId))
        },
        signOut: () => {
            dispatch(actionSignOutRequest())
        },
        fetchPurchaseHistory: userId => {
            dispatch(actionFetchPurchaseHistoryRequest(userId))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MenuContainer))
