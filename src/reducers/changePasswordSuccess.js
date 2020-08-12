import * as types from '../constants/ActionTypes'
const initialState = false
const changePasswordSuccess = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_PASSWORD_SUCCESS:
            return action.changePasswordSuccess
        default:
            return state
    }
}

export default changePasswordSuccess
