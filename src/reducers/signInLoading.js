import * as types from '../constants/ActionTypes'
const initialState = false

const signInLoading = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_IN_LOADING:
            return action.signInLoading
        default:
            return state
    }
}

export default signInLoading
