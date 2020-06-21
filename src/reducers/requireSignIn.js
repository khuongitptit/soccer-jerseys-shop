import * as types from '../constants/ActionTypes'
const initialState = false
const requireSignIn = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUIRE_SIGNIN:
            return action.requireSignIn
        default:
            return state
    }
}

export default requireSignIn
