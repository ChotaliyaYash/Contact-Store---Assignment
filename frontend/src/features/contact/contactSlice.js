import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
    addContact,
    deleteContact,
    updateContact,
    getContact,
    getContacts,
} from './contactApi'

export const addContactAsyncThunk = createAsyncThunk(
    'contact/addContact',
    async (data, { rejectWithValue }) => {
        try {
            const res = await addContact(data);
            const resData = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteContactAsyncThunk = createAsyncThunk(
    'contact/deleteContact',
    async (data, { rejectWithValue }) => {
        try {
            const res = await deleteContact(data);
            const resData = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updateContactAsyncThunk = createAsyncThunk(
    'contact/updateContact',
    async (data, { rejectWithValue }) => {
        try {
            const res = await updateContact(data);
            const resData = res.data;
            return resData.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getContactsAsyncThunk = createAsyncThunk(
    'contact/getContacts',
    async () => {
        try {
            const res = await getContacts();
            const resData = res.data;
            return resData.data;
        } catch (error) {
            return error;
        }
    }
)

export const getContactAsyncThunk = createAsyncThunk(
    'contact/getContact',
    async () => {
        try {
            const res = await getContact();
            const resData = res.data;
            return resData.data;
        } catch (error) {
            return error;
        }
    }
)

const initialState = {
    error: null,
    loading: false,
    contacts: [
        {
            name: "Yash Chotaliya",
            email: "yash@gmail.com",
            phone: "+91-9723357085",
            _id: 1,
        },
        {
            name: "Yash Chotaliya",
            email: "yash@gmail.com",
            phone: "+91-9723357085",
            _id: 2,
        },
        {
            name: "Yash Chotaliya",
            email: "yash@gmail.com",
            phone: "+91-9723357085",
            _id: 3,
        },
        {
            name: "Yash Chotaliya",
            email: "yash@gmail.com",
            phone: "+91-9723357085",
            _id: 4,
        },
    ],
    singleContact: null,
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        getContactFromStorage: (state) => {
            localStorage.getItem('contact') && (state.contacts = JSON.parse(localStorage.getItem('contact')));
        },
        addContactSlice: (state, action) => {
            state.contacts.push(action.payload);
            localStorage.setItem('contact', JSON.stringify(state.contacts));
        },
        updateContactSlice: (state, action) => {
            const index = state.contacts.findIndex((contact) => contact._id === action.payload._id);
            state.contacts[index] = action.payload;
            localStorage.setItem('contact', JSON.stringify(state.contacts));
        },
        deleteContactSlice: (state, action) => {
            state.contacts = state.contacts.filter((contact) => contact._id !== action.payload);
            localStorage.setItem('contact', JSON.stringify(state.contacts));
        },
    },

    extraReducers: (builder) => {
        builder
            // get contacts
            .addCase(getContactsAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactsAsyncThunk.fulfilled, (state, action) => {
                localStorage.setItem('contact', JSON.stringify(action.payload));

                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(getContactsAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // add contact
            .addCase(addContactAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(addContactAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts.push(action.payload);
                state.error = null;

                localStorage.setItem('contact', JSON.stringify(state.contacts));
            })
            .addCase(addContactAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update contact
            .addCase(updateContactAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateContactAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.contacts.findIndex((contact) => contact._id === action.payload._id);
                state.contacts[index] = action.payload;

                localStorage.setItem('contact', JSON.stringify(state.contacts));
            })
            .addCase(updateContactAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete contact
            .addCase(deleteContactAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteContactAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.contacts = state.contacts.filter((contact) => contact._id !== action.payload);

                localStorage.setItem('contact', JSON.stringify(state.contacts));
            })
            .addCase(deleteContactAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get contact
            .addCase(getContactAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContactAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.singleContact = action.payload;
            })
            .addCase(getContactAsyncThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export const { getContactFromStorage, addContactSlice, deleteContactSlice, updateContactSlice } = contactSlice.actions

export default contactSlice.reducer