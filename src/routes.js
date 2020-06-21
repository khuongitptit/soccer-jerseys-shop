import React from 'react'
import Home from './pages/Home/Home'
import SignInContainer from './containers/SignInContainer'
import UserInfoContainer from './containers/UserInfoContainer'
import SignUpContainer from './containers/SignUpContainer'
import ProductViewContainer from './containers/ProductViewContainer'
import UserCartContainer from './containers/UserCartContainer'
import PurchaseHistoryContainer from './containers/PurchaseHistoryContainer'
const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Home />,
    },
    {
        path: '/signin',
        exact: true,
        component: ({ history }) => <SignInContainer history={history} />,
    },
    {
        path: '/signup',
        exact: true,
        component: () => <SignUpContainer />,
    },
    {
        path: '/:userid/edit',
        exact: true,
        component: () => <UserInfoContainer />,
    },
    {
        path: '/:productId/detail',
        exact: true,
        component: () => <ProductViewContainer />,
    },
    {
        path: '/:userId/cart',
        exact: true,
        component: () => <UserCartContainer />,
    },
    {
        path: '/:userId/purchase-history',
        exact: true,
        component: () => <PurchaseHistoryContainer />,
    },
]
export default routes
