import * as types from '../constants/ActionTypes'
const initialState = []
const filter = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_FILTER:
            return [...action.filter]
        default:
            return state
    }
}

export default filter
