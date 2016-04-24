var React = require('react');

const headingSubheading = "<div class=\"site-heading\"><h1>ozoli</h1>"
    + "<hr class=\"small\">"
    + "<span class=\"subheading\">Various random posts about food, travel and tech</span></div>";

var About = React.createClass({

    render: function() {
        document.evaluate('/html/body/header/div/div/div', document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = headingSubheading;

        return (
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <p>I am an Australian currently living in Amsterdam working in software development roles. I studied mathematics and computer science at the University of Adelaide.</p>
                    <p>Currently I am taking the Data Science and Big Data Specialisation courses on Coursera which I enjoy. In my spare time I like cooking and sports such as cycling, rugby and hockey.</p>
                    <p>Following and contact links are below including the source code behind this website.</p>
                </div>
            </div>
        );
    }
});

module.exports = About;
