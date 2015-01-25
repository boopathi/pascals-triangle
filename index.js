var Pascal = require('./src/Pascal');

document.addEventListener('DOMContentLoaded', function() {
	React.render(React.createElement(Pascal, {
		n: 10
	}), document.getElementById('react'));
});
