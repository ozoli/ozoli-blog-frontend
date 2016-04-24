var React = require('react');
var Reflux = require('reflux');
var BlogStore = require('../stores/blogstore');
var NotFoundPage = require('./404.jsx');

const preHeadingTemplate = "<div class=\"subheading\"><h1>";
const postHeadingTemplate = "</h1><hr class=\"small\"><span class=\"subheading\"><b>";
const postSubHeadingTemplate = "</b></span></div>";

var Blog = React.createClass({
    mixins: [Reflux.connect(BlogStore, 'blogstore'), Reflux.ListenerMixin],

    propTypes: {
        blogLinkTitle: React.PropTypes.string
    },

    componentDidMount: function() {
        this.listenTo(BlogStore, this.onStoreChange);
    },

    /**
     * when blog directly accessed and BlogStore is empty the listener mixin will call this method.
     */
    onStoreChange: function() {
        if (!this.state.currentBlog) {
            this.setState({currentBlog: BlogStore.getBlogByLinkTitle(this.props.blogLinkTitle)});
            this.render();
        }
    },

    getInitialState: function() {
        return {
            currentBlog: BlogStore.getBlogByLinkTitle(this.props.blogLinkTitle)
        };
    },

    /**
     * Render the blog body and also change the header title and subheading to blog title and publication date.
     * @returns {XML} for the article including the blog body
     */
    render: function() {
        if (this.state.currentBlog && this.props.blogLinkTitle) {
            document.evaluate('/html/body/header/div/div/div', document, null,
                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML =
                preHeadingTemplate + this.state.currentBlog.title + postHeadingTemplate
                + this.state.currentBlog.pubDate + postSubHeadingTemplate;

            return (
                <article>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"
                                 dangerouslySetInnerHTML={{__html: this.state.currentBlog.body}}>
                            </div>
                        </div>
                    </div>
                </article>
            );
        }
        else {
            return (<NotFoundPage/>);
        }
    }
});

module.exports = Blog;
