var React = require('react');
var Reflux = require('reflux');
var BlogStore = require('../stores/blogstore');
var BlogSummary = require('./blogSummary.jsx');

const headingSubheading = "<div id=\"site-heading\" class=\"site-heading\"><h1>ozoli</h1>"
    + "<hr class=\"small\">"
    + "<span class=\"subheading\">Various random posts about food, travel and tech</span></div>";

var BlogList = React.createClass({
    mixins: [Reflux.connect(BlogStore, 'blogstore'), Reflux.ListenerMixin],

    getInitialState: function() {
        return {
            blogstore: BlogStore.getBlogs()
        };
    },

    componentDidMount: function() {
        this.listenTo(BlogStore, this.onStoreChange);
    },

    /**
     * when the blogs are updated the page will be refreshed.
     */
    onStoreChange: function() {
        var newBlogData = BlogStore.getBlogs();
        if (this.state.blogstore && newBlogData && newBlogData.length > this.state.blogstore.length) {
            this.setState({blogstore: newBlogData});
            this.render();
        }
    },

    render: function() {
        document.evaluate('/html/body/header/div/div/div', document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = headingSubheading;

        if (this.state.blogstore) {
            return (
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">

                    {Object.keys(this.state.blogstore).map(function(linkTitle, index) {
                        return (
                            <BlogSummary key={index} blogLinkTitle={linkTitle}/>
                        );
                    })}
                    </div>
                </div>
            );
        }
        else {
            return (<div className="row"></div>);
        }
    }
});

module.exports = BlogList;
