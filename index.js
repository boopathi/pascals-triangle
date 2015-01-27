var Pascal = require('./src/Pascal'),
	Matrix = require('./src/Matrix');

var p = new Pascal(1);

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

var m = new Matrix(ctx, p);

m.highlights = 'fractal';

// m.applyBoolean(p.getPrimes());

// _.each(_.last(p.grid), function(e,i) {
// 	console.log(i,e);
// });

var i = 0;
function step() {
	m.n = i++;
	if(i<10) window.requestAnimationFrame(step);
}
requestAnimationFrame(step);
