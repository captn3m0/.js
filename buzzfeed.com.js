function getQueryParameters(str) {
	return str.replace(/(^\?)/, '').split('&').map(
		function(n) {
			return (n = n.split('=')), (this[n[0]] = n[1]), this;
		}.bind({})
	)[0];
}

document
	.querySelectorAll('a[href^="https://go.redirectingat.com"]')
	.forEach(function(a) {
		var params = getQueryParameters(a.getAttribute('href'));
		var link = unescape(params.url);

		a.setAttribute('href', link);
	});
