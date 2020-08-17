module.exports = {

    handleFileUpload: (file) => {
        let result = false;
        if (file === null) return false


        file.mv(`../client/public/uploads/${file.name}`, function(err) {
            if (err) {
                console.log(err);
                result = false;
            }
            result = true;
        });
        return result;
    }
}