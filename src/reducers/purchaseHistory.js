import * as types from '../constants/ActionTypes'
const initialState = []
const purchaseHistory = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PURCHASE_HISTORY:
            return [...action.purchaseHistory]
        case types.BUY_PRODUCT:
            return [...state, action.item]
        default:
            return state
    }
}

export default purchaseHistory
