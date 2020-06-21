import * as types from '../constants/ActionTypes'
const initialState = false
const signInFail = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SIGN_IN_FAIL_STATUS:
            return action.signInFail
        default:
            return state
    }
}

export default signInFail
