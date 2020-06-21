import * as types from '../constants/ActionTypes'
const initialState = false
const signedInStatus = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SIGNED_IN_STATUS:
            return action.isSignedIn
        default:
            return state
    }
}

export default signedInStatus
