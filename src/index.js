import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store, persistor } from './store/ConfigStore'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)

// import tree from './utils/tree.json'
// const mapp = () => {
//     for (var key in tree) {
//         if (tree.hasOwnProperty(key)) {
//             console.log(tree[key].name);
//         }
//     }
// }
// ReactDOM.render(
//     <div>{
//         mapp()

//     }</div>
//     , document.getElementById('root'));
