var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var listService = require('../service/listService');



router.get('/publish_list/:page_id/:token', function(req, res) {
    var page_id = req.params.page_id;
    var token = req.params.token;
    listService.get_publish_list(page_id, token, function(post) {
        console.log(post);
        res.send(post);
    })
});


router.get('/unpublish_list/:page_id/:token', function(req, res) {
    var page_id = req.params.page_id;
    var token = req.params.token;
    listService.get_unpublish_list(page_id, token, function(post) {
        console.log(post);
        res.send(post);
    })
});




router.get('/post_num/:page_id/:token', function(req, res) {
    var page_id = req.params.page_id;
    var token = req.params.token;
    listService.get_post_view_num(page_id, token, function(post) {
        res.send(post);
    })
});


router.post('/post_public', jsonParser, function(req, res) {

    listService.post_public(req.body,function(post) {
        res.send(post);
    })
});


router.post('/post_unpublic', jsonParser, function(req, res) {

    listService.post_unpublic(req.body,function(post) {
        res.send(post);
    })
});

router.post('/post_list', jsonParser, function(req, res) {

    listService.post_list(req.body,function(post) {
        res.send(post);
    })
});

router.get('/get_list/:page_id', function(req, res) {
    var id = req.params.page_id;

    listService.get_list(id,function(post) {
        res.send(post);
    })
});


router.get('/get_recent_list', function(req, res) {
    var num = 5;
    listService.get_recent_list(num,function(post) {
        res.send(post);
    })
});


router.get('/get_hot_list', function(req, res) {
    var num = 5;
    listService.get_hot_list(num,function(post) {
        res.send(post);
    })
});



module.exports = router;