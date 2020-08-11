var express = require('express');
var router = express.Router();

router.route('/courses')

// Add a new Course
.post(function(req, res) {
    Course.addCourse(req.body, function(err, newCourse) {
        if (!err) {
            logger.log(req, 'add' + req.url.replace(/\//g, '_'));
            res.send({ success: true, data: newCourse });
        } else {
            if (err.name == 'ValidationError') {
                res.status(400).send({ success: false, error: 'ValidationException', message: err.message });
            } else {
                res.status(500).send({ success: false, error: 'ExeptionOccured', message: 'Error occured' });
                throw err;
            }
        }
    });
})


module.exports = router;