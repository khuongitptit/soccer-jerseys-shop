import * as types from '../constants/ActionTypes'
const initialState = false
const udpateInfoSuccess = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_INFO_SUCCESS:
            return action.updateSuccess
        default:
            return state
    }
}

export default udpateInfoSuccess