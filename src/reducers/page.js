import * as types from '../constants/ActionTypes'
const initialState = 1
const page = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_PAGE:
            return action.page
        default:
            return state
    }
}

export default page
