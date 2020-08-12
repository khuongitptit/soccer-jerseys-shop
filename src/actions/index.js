import * as types from '../constants/ActionTypes'
import firebase from '../firebaseConfig/index'

import { getProductsByPage } from '../utils/pagination'
const db = firebase.firestore()
export const actionSignInLoading = signInLoading => {
    return {
        type: types.SIGN_IN_LOADING,
        signInLoading,
    }
}
export const actionProductsLoading = productsLoading => {
    return {
        type: types.PRODUCTS_LOADING,
        productsLoading,
    }
}
export const actionFetchProductsRequest = (filter, page) => {
    const key = filter[0]
    return dispatch => {
        let products = []
        if (key === 'all' || filter.length === 0) {
            //fetch all
            db.collection('products')
                .orderBy('type')
                .get()
                .then(res => {
                    res.docs.forEach(doc => {
                        products.push({
                            id: doc.id,
                            ...doc.data(),
                        })
                    })
                })
                .then(() => {
                    dispatch(
                        actionfetchProducts(getProductsByPage(products, page))
                    )
                })
        } else if (key === 'country') {
            // type= country
            db.collection('products')
                .where('type', '==', 'country')
                .orderBy('country')
                .get()
                .then(res => {
                    res.docs.forEach(doc => {
                        products.push({
                            id: doc.id,
                            ...doc.data(),
                        })
                    })
                })
                .then(() => {
                    dispatch(
                        actionfetchProducts(getProductsByPage(products, page))
                    )
                })
        } else if (key === 'league') {
            //type=league
            db.collection('products')
                .where('type', '==', 'league')
                .orderBy('league')
                .get()
                .then(res => {
                    res.docs.forEach(doc => {
                        products.push({
                            id: doc.id,
                            ...doc.data(),
                        })
                    })
                })
                .then(() => {
                    dispatch(
                        actionfetchProducts(getProductsByPage(products, page))
                    )
                })
        } else {
            // specific product
            db.collection('products')
                .where('country', '==', key)
                .get()
                .then(res => {
                    res.docs.forEach(doc => {
                        products.push({
                            id: doc.id,
                            ...doc.data(),
                        })
                    })
                })
                .then(() => {
                    db.collection('products')
                        .where('league', '==', key)
                        .get()
                        .then(res => {
                            res.docs.forEach(doc => {
                                products.push({
                                    id: doc.id,
                                    ...doc.data(),
                                })
                            })
                        })
                })
                .then(() => {
                    db.collection('products')
                        .where('club', '==', key)
                        .get()
                        .then(res => {
                            res.docs.forEach(doc => {
                                products.push({
                                    id: doc.id,
                                    ...doc.data(),
                                })
                            })
                        })
                        .then(() => {
                            dispatch(
                                actionfetchProducts(
                                    getProductsByPage(products, page)
                                )
                            )
                        })
                })
        }
    }
}
export const actionfetchProducts = products => {
    return {
        type: types.FETCH_PRODUCTS,
        products,
    }
}
export const actionChangeFilter = filter => {
    return {
        type: types.CHANGE_FILTER,
        filter,
    }
}
export const actionChangePage = page => {
    return {
        type: types.CHANGE_PAGE,
        page,
    }
}
export const actionSignUpRequest = account => {
    return dispatch => {
        dispatch(actionSignInLoading(true))
        firebase
            .auth()
            .createUserWithEmailAndPassword(account.email, account.password)
            .then(res => {
                dispatch(actionSignUpSuccess(true))
                const timer1 = setTimeout(() => {
                    //set signUpSuccessful  = false after alert to user
                    dispatch(actionSignUpSuccess(false))
                    return clearTimeout(timer1)
                }, 100)
                const user = firebase.auth().currentUser
                if (!user.emailVerified) {
                    //send email
                    user.sendEmailVerification()
                }
                return db
                    .collection('users')
                    .doc(res.user.uid) //add user info
                    .set({
                        fullName: account.fullName,
                        gender: account.gender,
                        phone: account.phone,
                        address: {
                            city: account.address.city,
                            district: account.address.district,
                            commune: account.address.commune,
                            houseNumber: account.address.houseNumber,
                        },
                    })
                    .then(() => {
                        dispatch(actionSignInLoading(false))
                    })
            })
            .catch(err => {
                dispatch(actionSignUpError(err.code))
            })
    }
}
export const actionSignUpSuccess = signUpSuccess => {
    return {
        type: types.SIGN_UP_SUCCESS,
        signUpSuccess: signUpSuccess,
    }
}
export const actionSignUpError = signUpError => {
    return {
        type: types.SIGN_UP_ERROR,
        signUpError: signUpError,
    }
}
export const actionSignInRequest = (username, password) => {
    return dispatch => {
        dispatch(actionSignInLoading(true))
        let userId = ''
        firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(res => {
                userId = res.user.uid
                db.collection('users')
                    .doc(userId)
                    .get()
                    .then(res => {
                        dispatch(
                            actionSignInAccount({
                                id: userId,
                                ...res.data(),
                            })
                        )
                    })
            })
            .then(() => {
                dispatch(actionSignInLoading(false))
                dispatch(actionSetSignedInStatus(true))
                dispatch(actionSetSignInFailStatus(false))
                dispatch(actionFetchCartRequest(userId))
                dispatch(actionFetchPurchaseHistoryRequest(userId))
            })
            .catch(err => {
                //sign in failed
                dispatch(actionSignInLoading(false))
                dispatch(actionSetSignedInStatus(false))
                dispatch(actionSetSignInFailStatus(true))
                const timer1 = setTimeout(() => {
                    dispatch(actionSetSignInFailStatus(false))
                    return clearTimeout(timer1)
                }, 300)
            })
    }
}

export const actionSetSignedInStatus = isSignedIn => {
    return {
        type: types.SET_SIGNED_IN_STATUS,
        isSignedIn,
    }
}

export const actionSetSignInFailStatus = signInFail => {
    return {
        type: types.SET_SIGN_IN_FAIL_STATUS,
        signInFail,
    }
}
export const actionSignInAccount = account => {
    return {
        type: types.SIGN_IN,
        account,
    }
}

export const actionSignOutAccount = () => {
    return {
        type: types.SIGN_OUT,
    }
}
export const actionSignOutRequest = () => {
    return dispatch => {
        dispatch(actionSignOutAccount())
        dispatch(actionSetSignedInStatus(false))
        dispatch(actionFetchCart([]))
        dispatch(actionFetchPurchaseHistory([]))
    }
}

export const actionUpdateInfoRequest = userBasicInfo => {
    return dispatch => {
        db.collection('users')
            .doc(userBasicInfo.id)
            .update({
                ...userBasicInfo,
            })
            .then(() => {
                dispatch(actionUpdateInfo(userBasicInfo))
                dispatch(actionUpdateInfoSuccess(true))
                const timer1 = setTimeout(() => {
                    dispatch(actionUpdateInfoSuccess(false))
                    return clearTimeout(timer1)
                }, 100)
            })
    }
}
export const actionUpdateInfo = account => {
    return {
        type: types.UPDATE_INFO,
        account,
    }
}
export const actionUpdateInfoSuccess = updateSuccess => {
    return {
        type: types.UPDATE_INFO_SUCCESS,
        updateSuccess,
    }
}
export const actionChangePasswordRequest = userPassword => {
    return dispatch => {
        const user = firebase.auth().currentUser
        user.reauthenticateWithCredential(
            firebase.auth.EmailAuthProvider.credential(
                firebase.auth().currentUser.email,
                userPassword.currentPassword
            )
        )
            .then(() => {
                user.updatePassword(userPassword.newPassword).then(() => {
                    dispatch(actionChangePasswordSuccess(true))
                    const timer1 = setTimeout(() => {
                        dispatch(actionChangePasswordSuccess(false))
                        return clearTimeout(timer1)
                    }, 100)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}
export const actionChangePasswordSuccess = changePasswordSuccess => {
    return {
        type: types.CHANGE_PASSWORD_SUCCESS,
        changePasswordSuccess,
    }
}
export const actionFetchCartRequest = userId => {
    return dispatch => {
        let cart = []
        db.collection('userCart')
            .where('userId', '==', userId)
            .get()
            .then(res => {
                res.docs.forEach(doc => {
                    const cartItem = doc.data()
                    cart.push({
                        product: cartItem.product,
                        customName: cartItem.customName,
                        customNumber: cartItem.customNumber,
                        quantity: cartItem.quantity,
                    })
                })
                dispatch(actionFetchCart(cart))
            })
    }
}
export const actionFetchCart = cart => {
    return {
        type: types.FETCH_CART,
        cart,
    }
}
export const actionAddToCartRequest = (
    userId,
    productId,
    addedQuantity,
    customName,
    customNumber
) => {
    return dispatch => {
        db.collection('userCart')
            .where('userId', '==', userId)
            .where('product.id', '==', productId)
            .where('customName', '==', customName)
            .where('customNumber', '==', customNumber)
            .get() //check if user have this product with the same name and number yet
            .then(res => {
                if (res.docs.length) {
                    //if yes
                    let key
                    for (key in res.docs) break //get first key of user collection
                    let currentQuantity = res.docs[key].data().quantity //get current quantity of this product
                    let id = res.docs[key].id //get id of userCart
                    // db.collection("products").doc(productId).get().then(res => {
                    //     const product ={ id:res.id ,...res.data()}
                    // })
                    db.collection('userCart')
                        .doc(id)
                        .set(
                            {
                                quantity: currentQuantity + addedQuantity,
                            },
                            { merge: true } // add quantity
                        )
                        .then(() => {
                            db.collection('userCart')
                                .where('userId', '==', userId)
                                .get() //get userCart items
                                .then(res => {
                                    let cartItems = []
                                    res.docs.forEach(doc => {
                                        cartItems.push({
                                            product: doc.data().product,
                                            quantity: doc.data().quantity,
                                            customName: doc.data().customName,
                                            customNumber: doc.data()
                                                .customNumber,
                                        })
                                    })
                                    dispatch(actionAddToCart(cartItems))
                                })
                        })
                } else {
                    // if no
                    let product = {}
                    db.collection('products')
                        .doc(productId)
                        .get()
                        .then(res => {
                            product = {
                                id: res.id,
                                ...res.data(),
                            }
                        })
                        .then(() => {
                            const newCartItem = {
                                userId,
                                product,
                                quantity: addedQuantity,
                                customName: customName,
                                customNumber: customNumber,
                            }
                            db.collection('userCart')
                                .add(newCartItem)
                                .then(() => {
                                    dispatch(actionAddToCart(newCartItem))
                                    // db.collection('userCart')
                                    //     .where('userId', '==', userId)
                                    //     .get()
                                    //     .then(res => {
                                    //         let cartItems = []
                                    //         res.docs.forEach(doc => {
                                    //             cartItems.push({
                                    //                 product: doc.data().product,
                                    //                 quantity: doc.data()
                                    //                     .quantity,
                                    //                 customName: doc.data()
                                    //                     .customName,
                                    //                 customNumber: doc.data()
                                    //                     .customNumber,
                                    //             })
                                    //         })
                                    //         dispatch(actionAddToCart(cartItems))
                                    //     })
                                })
                        })
                }
            })
    }
}
export const actionAddToCart = cartItem => {
    return {
        type: types.ADD_TO_CART,
        cartItem,
    }
}
export const actionDeleteFromCartRequest = (userId, productId) => {
    return dispatch => {
        db.collection('userCart')
            .where('userId', '==', userId)
            .where('product.id', '==', productId)
            .get()
            .then(res => {
                let docId = ''
                res.docs.forEach(doc => {
                    docId = doc.id
                })
                db.collection('userCart')
                    .doc(docId)
                    .delete()
                    .then(() => {
                        dispatch(actionDeleteFromCart(productId))
                    })
            })
    }
}
export const actionDeleteFromCart = productId => {
    return {
        type: types.DELETE_FROM_CART,
        productId,
    }
}
export const actionBuyProductRequest = (userId, item) => {
    const getDayInWord = day => {
        switch (day) {
            case 0:
                return 'Chủ Nhật'
            case 1:
                return 'Thứ Hai'
            case 2:
                return 'Thứ Ba'
            case 3:
                return 'Thứ Tư'
            case 4:
                return 'Thứ Năm,'
            case 5:
                return 'Thứ Sáu'
            case 6:
                return 'Thứ Bảy'
            default:
        }
    }
    return dispatch => {
        const current = new Date()
        const newBuyRequest = {
            userId,
            buyItem: item,
            day: `${getDayInWord(current.getDay())}, ${current.getDate()}/${
                current.getMonth() + 1
            }/${current.getFullYear()}`,
            time: `${current.getHours()}:${current.getMinutes()}`,
        }
        db.collection('buyRequests')
            .add(newBuyRequest)
            .then(() => {
                db.collection('purchaseHistory')
                    .add(newBuyRequest)
                    .then(() => {
                        dispatch(actionBuyProduct(newBuyRequest))
                        dispatch(
                            actionDeleteFromCart(
                                userId,
                                newBuyRequest.buyItem.product.id
                            )
                        )
                    })
            })
    }
}
export const actionBuyProduct = item => {
    return {
        type: types.BUY_PRODUCT,
        item,
    }
}
export const actionFetchPurchaseHistoryRequest = userId => {
    return dispatch => {
        db.collection('purchaseHistory')
            .where('userId', '==', userId)
            .get()
            .then(res => {
                let purchaseHistory = []
                res.docs.forEach(doc => {
                    purchaseHistory.push(doc.data())
                })
                dispatch(actionFetchPurchaseHistory(purchaseHistory))
            })
    }
}
export const actionFetchPurchaseHistory = purchaseHistory => {
    return {
        type: types.FETCH_PURCHASE_HISTORY,
        purchaseHistory,
    }
}
