import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import contactReducer from '../features/contact/contactSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        contact: contactReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})