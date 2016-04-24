var Reflux = require('reflux');
var $ = require('jquery');
var BlogActions = require('../actions/blogactions');
var Q = require('q');

$(document).ajaxError(function(e, jqxhr, settings, exception) {
    if (jqxhr.readyState == 0 || jqxhr.status == 0) {
        console.error('blogs fetch ajax error, readyState = 0 and status = 0');
    }
});

function getBlogsFromServer() {
    return Q($.ajax({
        type: "GET",
        url: 'https://1m3837cydj.execute-api.us-east-1.amazonaws.com/prod',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }));
}

var BlogStore = Reflux.createStore({
    listenables: [BlogActions],
    blogs: {},
    remoteBlogsCall: getBlogsFromServer(),

    init: function() {
        this.fetchBlogs();
    },

    getBlogByLinkTitle: function(blogLinkTitle) {
        if (this.blogs === undefined || this.blogs.length == 0) {
            this.init();
        }
        return this.blogs[blogLinkTitle];
    },

    getBlogs: function() {
        if (this.blogs === undefined || this.blogs.length == 0) {
            this.init();
        }
        return this.blogs;
    },

    setContent: function(data) {
        // Index blogs by link title,
        newBlogData = {};
        for (idx = 0; idx < data.length; idx++) {
            newBlogData[data[idx].linkTitle] = data[idx];
        }
        this.blogs = newBlogData;
        this.trigger(this.blogs);
    },

    fetchBlogs: function() {
        this.remoteBlogsCall.then(this.setContent);
    }
});

module.exports = BlogStore;
