var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router-component').Link;

var BlogStore = require('../stores/blogstore');

const previewTextWordLength = 50;

function countWords(str) {
    var matches = str.match(/[\w\d]+/gi);
    return matches ? matches.length : 0;
}

function summariseWords(str) {
    return str.split(/\s+/).slice(0, previewTextWordLength).join(" ") + '...';
}

var BlogSummary = React.createClass({
    mixins: [Reflux.connect(BlogStore, 'blogstore')],

    propTypes: {
        blogLinkTitle: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            blogstore: BlogStore.getBlogs()
        };
    },

    render: function() {
        if (this.state.blogstore) {
            var blog = this.state.blogstore[this.props.blogLinkTitle];
            var blogUri = "/blog/" + blog.linkTitle;
            if (countWords(blog.body) <= previewTextWordLength) {
                return (
                    <div className="post-preview" key={blog.id}>
                        <Link id={blog.id} href={blogUri}>
                            <h2 className="post-title">{blog.title}</h2>
                        </Link>
                        <div className="post-subtitle" dangerouslySetInnerHTML={{__html: blog.body}}></div>
                        <p className="post-meta">Posted by <a href="#">Oliver Carr</a> on {blog.pubDate}</p>
                    </div>
                );
            } else {
                var textSummary = summariseWords(blog.body);
                return (
                    <div className="post-preview" key={blog.id}>
                        <Link id={blog.id} href={blogUri}>
                            <h2 className="post-title">{blog.title}</h2>
                        </Link>
                        <div className="post-subtitle" dangerouslySetInnerHTML={{__html: textSummary}}></div>
                        <Link id={blog.id} href={blogUri}>Read more</Link>
                        <p className="post-meta">Posted by <a href="#">Oliver Carr</a> on {blog.pubDate}</p>
                    </div>
                );
            }
        }
        else {
            return (<div className="row">Blog Not Found :(</div>);  // TODO fixme!!
        }
    }
});

module.exports = BlogSummary;
