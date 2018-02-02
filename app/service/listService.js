var request = require('request');
var _ = require('lodash');
var ListModel = require('../models/listModel');

var get_publish_list = function(page_id, token, callback) {
    var service_url = "https://graph.facebook.com" +  "/v2.11/" + page_id + "/posts?access_token=" + token;
    var options = {
        method: 'GET',
        url: service_url ,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    function cb(error, response, body) {
        if (!error) {
            var info = JSON.parse(JSON.stringify(body));
            callback(info);
        }
        else {
            console.log('Error happened: '+ error);
        }
    }
    request(options, cb);
};


var get_unpublish_list = function(page_id, token, callback) {
    var service_url = "https://graph.facebook.com" +  "/v2.11/" + page_id + "/promotable_posts?is_published=false&access_token=" + token;
    var options = {
        method: 'GET',
        url: service_url ,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    function cb(error, response, body) {
        if (!error) {
            var info = JSON.parse(JSON.stringify(body));
            callback(info);
        }
        else {
            console.log('Error happened: '+ error);
        }
    }
    request(options, cb);
};



var get_post_view_num = function(post_id, token, callback) {
    var service_url = "https://graph.facebook.com" +  "/v2.11/" + post_id + "/insights/post_engagements/lifetime?access_token=" + token;
    var options = {
        method: 'GET',
        url: service_url ,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    function cb(error, response, body) {
        if (!error) {
            var info = JSON.parse(JSON.stringify(body));
            callback(info);
        }
        else {
            console.log('Error happened: '+ error);
        }
    }
    request(options, cb);
};



var post_public = function(input, callback) {
    console.log(input);
    var service_url = "https://graph.facebook.com" +  "/v2.11/" + input.page_id + "/feed?message=" + input.text + "&access_token=" + input.token;
    var options = {
        method: 'POST',
        url: service_url ,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    function cb(error, response, body) {
        if (!error) {
            var info = JSON.parse(JSON.stringify(body));
            callback(info);
        }
        else {
            console.log('Error happened: '+ error);
        }
    }
    request(options, cb);
};




var post_unpublic = function(input, callback) {
    console.log(input);
    var service_url = "https://graph.facebook.com" +  "/v2.11/" + input.page_id + "/feed?published=false&message=" + input.text + "&access_token=" + input.token;
    var options = {
        method: 'POST',
        url: service_url ,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    function cb(error, response, body) {
        if (!error) {
            var info = JSON.parse(JSON.stringify(body));
            callback(info);
        }
        else {
            console.log('Error happened: '+ error);
        }
    }
    request(options, cb);
};


var post_list = function(input, callback) {

    ListModel.find({}, function (err, posts) {
        var list = new ListModel({ content: input.content, timestamp: (new Date()), visited: 0, id: posts.length });
        list.save();
        callback(list)
    });


};



var get_list = function(id, callback) {

    ListModel.findOne({id: id}, function (err, post) {
        if (err) {
            callback({err: 'error'})
        }else{
            ListModel.update({id: post.id},{ visited: post.visited + 1 }, function(err, data){});
            callback(post)
        }
    });


};


var get_recent_list = function(num, callback) {

    ListModel.find({}, function (err, posts) {
        if (err) {
            callback({err: 'error'})
        }else{
            num = Math.min(num, posts.length);
            var recent_list = [];
            for (var i = 1; i <= num; i +=1 ) {
                recent_list.push(posts[posts.length - i])
            }
            callback(recent_list)
        }
    });


};


var get_hot_list = function(num, callback) {

    ListModel.find({}, function (err, posts) {
        if (err) {
            callback({err: 'error'})
        }else{
            num = Math.min(num, posts.length);
            posts =  _.sortBy(posts, "visited");
            var hot_list = [];
            for (var i = 1; i <= num; i +=1 ) {
                hot_list.push(posts[posts.length - i])
            }
            callback(hot_list)
        }
    });


};








module.exports = {
    get_publish_list: get_publish_list,
    get_unpublish_list: get_unpublish_list,
    get_post_view_num: get_post_view_num,
    post_public:post_public,
    post_unpublic: post_unpublic,
    post_list: post_list,
    get_list: get_list,
    get_recent_list: get_recent_list,
    get_hot_list:get_hot_list
};