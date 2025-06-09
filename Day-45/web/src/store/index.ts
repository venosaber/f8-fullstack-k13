import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products'
import customersReducer from './customers'
import colorsReducer from './colors'

const store = configureStore({
    reducer: {
        products: productsReducer,
        customers: customersReducer,
        colors: colorsReducer
    }
})

export default store

export * from './products'
// @ts-expect-error the names of some members are the same
export * from './customers'
// @ts-expect-error the names of some members are the same
export * from './colors'

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch