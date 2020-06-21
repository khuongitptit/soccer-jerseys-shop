import React from 'react'
import routes from './routes'
import MenuContainer from './containers/MenuContainer'
import 'antd/dist/antd.css'
import './App.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
const App = () => {
    const menuLink = routes => {
        let result = null
        result = routes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            )
        })
        return result
    }
    return (
        <div className="app">
            <Router>
                <MenuContainer />
                <Switch>{menuLink(routes)}</Switch>
            </Router>
        </div>
    )
}

export default App
