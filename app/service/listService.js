var _ = require('lodash');
var ListModel = require('../models/listModel');



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
    post_list: post_list,
    get_list: get_list,
    get_recent_list: get_recent_list,
    get_hot_list:get_hot_list
};