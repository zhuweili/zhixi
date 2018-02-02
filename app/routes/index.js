var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var path = __dirname.replace("/routes", "");
    res.sendFile(path + '/public/views/index.html');
});

module.exports = router;
