import * as types from '../constants/ActionTypes'
const initialState = []
const userCart = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_CART:
            return [...action.cart]
        case types.ADD_TO_CART:
            return [...state, action.cartItem]
        case types.DELETE_FROM_CART:
            let delIndex = 0
            state.forEach(item => {
                if (item.product.id === action.productId) {
                    delIndex = state.indexOf(item)
                }
            })
            state.splice(delIndex, 1)
            return [...state]
        default:
            return state
    }
}

export default userCart
