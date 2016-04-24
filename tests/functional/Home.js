define([
	'intern!object',
	'intern/chai!assert',
	'require'
], function (registerSuite, assert, require) {
	var url = 'http://localhost:8000';

	registerSuite({
		name: 'Home (functional)',

		'submit form': function () {
			return this.remote
				.get(require.toUrl(url))
				//.setFindTimeout(5000)
				.findByClassName('site-heading')
				.getVisibleText()
				.then(function (val) {
					console.log("Found text: " + val);
					assert.ok(val.indexOf('ozoli') > -1, 'ozoli should be the heading');
					assert.ok(val.indexOf('Various random posts about food, travel and tech') > -1,
						'Various random posts about food, travel and tech should be the heading');
				});
		}
	});
});
