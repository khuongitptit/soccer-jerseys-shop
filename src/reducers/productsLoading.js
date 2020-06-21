import * as types from '../constants/ActionTypes'
const initialState = false

const productsLoading = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCTS_LOADING:
            return action.productsLoading
        default:
            return state
    }
}

export default productsLoading
