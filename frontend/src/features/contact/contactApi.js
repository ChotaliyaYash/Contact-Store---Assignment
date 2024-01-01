import axios from "axios"

export const addContact = (data) => {
    return axios.post('/api/contact/add', data)
}

export const deleteContact = (data) => {
    return axios.delete(`/api/contact/delete/${data}`)
}

export const updateContact = (data) => {
    return axios.patch(`/api/contact/update/${data._id}`, data);
}

export const getContacts = (data) => {
    return axios.get('/api/contact/get');
}

export const getContact = (data) => {
    return axios.get(`/api/contact/get/${data}`);
}
