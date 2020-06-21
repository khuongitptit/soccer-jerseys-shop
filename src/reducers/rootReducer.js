import { combineReducers } from 'redux'
import products from './products'
import userAccount from './userAccount'
import signedInStatus from './signedInStatus'
import signInFail from './signInFail'
import userCart from './userCart'
import updateInfoSuccess from './updateInfoSuccess'
import signUp from './signUp'
import filter from './filter'
import page from './page'
import signInLoading from './signInLoading'
import purchaseHistory from './purchaseHistory'
import productsLoading from './productsLoading'
const rootReducer = combineReducers({
    products,
    userAccount,
    signedInStatus,
    signInFail,
    userCart,
    updateInfoSuccess,
    signUp,
    filter,
    page,
    signInLoading,
    productsLoading,
    purchaseHistory,
})
export default rootReducer
