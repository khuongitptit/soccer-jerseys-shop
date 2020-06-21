import React, { useEffect, useState } from 'react'
import PurchaseHistory from '../pages/PurchaseHistory/PurchaseHistory'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionFetchPurchaseHistoryRequest } from '../actions/index'
const PurchaseHistoryContainer = props => {
    const { purchaseHistory, userAccount, fetchPurchaseHistory } = props
    const [purchaseHistorySorted, setPurchaseHistorySorted] = useState(
        purchaseHistory
    )
    const [sort, setSort] = useState('newest')
    const userId = userAccount.id
    useEffect(() => {
        fetchPurchaseHistory(userId)
    }, [])
    const onChangeSort = e => {
        const sortValue = e.target.value
        setSort(sortValue)
        if (sort === 'newest') {
            setPurchaseHistorySorted(purchaseHistory)
        } else {
            const tmp = [...purchaseHistory]
            setPurchaseHistorySorted(tmp.reverse())
        }
    }
    return (
        <PurchaseHistory
            purchaseHistory={purchaseHistorySorted}
            onChangeSort={onChangeSort}
            sort={sort}
        />
    )
}
const mapStateToProps = state => {
    return {
        purchaseHistory: state.purchaseHistory,
        userAccount: state.userAccount,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchPurchaseHistory: userId => {
            dispatch(actionFetchPurchaseHistoryRequest(userId))
        },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PurchaseHistoryContainer))
