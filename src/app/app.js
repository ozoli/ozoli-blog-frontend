var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router-component');
var Locations = ReactRouter.Locations;
var Location = ReactRouter.Location;
var NotFound = ReactRouter.NotFound;

var BlogActions = require('./scripts/actions/blogactions');
var About = require('./scripts/components/about.jsx');
var Blog = require('./scripts/components/blog.jsx');
var BlogList = require('./scripts/components/bloglist.jsx');
var NotFoundPage = require('./scripts/components/404.jsx');

var ga = require('react-ga');
ga.initialize('UA-69349964-1');

setInterval(function() {
    BlogActions.fetchBlogs();
}, 150000);

const mount = document.getElementById('content');

var Home = React.createClass({

    render: function() {
        return (
            <div className="container">
                <BlogList/>
            </div>
        );
    }
});

var App = React.createClass({
    logPageView: function() {
        ga.pageview(window.location.pathname);
    },

    render: function() {
        return (
            <Locations hash onNavigation={this.logPageView}>
                <Location path="/" handler={Home}/>
                <Location path="/about" handler={About}/>
                <Location path="/blog/:blogLinkTitle" handler={Blog}/>
                <NotFound handler={NotFoundPage}/>
            </Locations>
        );
    }
});

ReactDOM.render(<App/>, mount);
