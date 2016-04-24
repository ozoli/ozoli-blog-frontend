var React = require('react');

var NotFoundPage = React.createClass({

    render: function() {
        return (
            <div className="row">
                <div className="container">
                    <h1>Not found <span>:(</span></h1>
                    <p>Sorry, but the page you were trying to view does not exist.</p>
                    <p>It looks like this was the result of either:</p>
                    <ul>
                        <li>a mistyped address</li>
                        <li>an out-of-date link</li>
                    </ul>
                    <p>You can go back to the <a href="/">home page</a>.</p>
                </div>
            </div>
        );
    }
});

module.exports = NotFoundPage;
