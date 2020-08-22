const LocalStorageService = {
    get(obj) {
        return localStorage.getItem(obj)
    },

    save(value) {
        localStorage.setItem("cartItems", JSON.stringify(value));
    },

    clear(key) {
        localStorage.removeItem(key)
    }

}

export { LocalStorageService }