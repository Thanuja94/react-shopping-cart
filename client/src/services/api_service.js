import axios from 'axios'

const baseURL = '';

const ApiService = {

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    setHeader(token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(url) {
        return axios.get(url)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    customRequest(data) {
        return axios(data)
    }
}

export default ApiService