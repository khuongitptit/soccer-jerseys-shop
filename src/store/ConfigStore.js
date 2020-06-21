import { createStore, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'
const PersistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(PersistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
