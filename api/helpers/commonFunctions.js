module.exports = {

    handleFileUpload: (file) => {
        if (file === null) return false

        file.mv(`../../client/public/uploads/${file.name}`, err => {
            if (err) {
                console.log(err);
                return false;
            }
            return true
        })
    }
}