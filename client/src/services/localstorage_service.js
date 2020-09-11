const LocalStorageService = {
    get() {
        return localStorage.getItem('cartItems')
    },

    save(value) {
        localStorage.setItem("cartItems", JSON.stringify(value));
    },

    clear(key) {
        localStorage.removeItem(key)
    }

}

export { LocalStorageService }