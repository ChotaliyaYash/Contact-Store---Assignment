import axios from "axios"

export const loginCall = (data) => {
    return axios.post('/api/auth/login', data)
}

export const signupcall = (data) => {
    return axios.post('/api/auth/signup', data)
}

export const logoutcall = () => {
    return axios.get(`/api/auth/logout`);
}
