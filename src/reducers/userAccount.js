import * as types from '../constants/ActionTypes'
const initialState = {}
const userAccount = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_IN:
            return action.account
        case types.SIGN_OUT:
            return {}
        case types.UPDATE_INFO:
            return action.account
        default:
            return state
    }
}

export default userAccount