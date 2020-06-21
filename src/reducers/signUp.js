import * as types from '../constants/ActionTypes'
const initialState = {
    signUpSuccess: false,
    signUpError: ''
}
const signUp = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpSuccess: action.signUpSuccess,

            }
        case types.SIGN_UP_ERROR:
            return {
                ...state,
                signUpError: action.signUpError
            }
        default:
            return state
    }
}

export default signUp