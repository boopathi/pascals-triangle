var _ = require('lodash');

module.exports = Pascal;

function Pascal(n) {
	this.grid = [];
	this.n = n;
}

//
// Define getters and setters
//

Object.defineProperties(Pascal.prototype, {
	n: {
		get: function() {
			return this._n;
		},
		set: function(val) {
			this._n = val;
			this.fillGrid();
		}
	}
});

//
// Statics
//

Pascal.sum = function(e) {
	return e.reduce((memo,num) => {
		var res = memo+num;
		if(res > Number.MAX_SAFE_INTEGER) {
			//console.warn('Not safe : ', res);
		}
		return res;
	}, 0);
};

//
// Methods
//

Pascal.prototype.multiplexArray = function(a, n) {
	var ret = [], i, x;
	for(i=0;i<n;i++) {
		for(x in a) {
			ret.push(a[x]);
		}
	}
	return ret;
};

Pascal.prototype.fillGrid = function() {
	this.grid = [];
	var x=[1], i;
	for(i=0;i<this._n;i++) {
		this.grid.push(x);
		x = _.map(
				_.zip(
					[0].concat(x),
					x.concat([0])
				),
				Pascal.sum
			);
	}
	return this.grid;
};

Pascal.prototype.biggest = function() {
	var last = _.last(this.grid);
	return last[Math.floor(last.length/2)];
	// var big = 1;
	// this.each(function(e) {
	// 	if(e>big) big = e;
	// });
	// return big;
}

Pascal.prototype.each = function(fn) {
	var result = [];
	_.each(this.grid, function(row, i) {
		var tmp = [];
		_.each(row, (e, j) => {
			tmp.push(fn(e,i,j));
		});
		result.push(tmp);
	});
	return result;
};

Pascal.prototype.primes = function() {
	var primes = [2,3,5,7,11,13,17,19,23];
	return this.each((e) => _.contains(primes, e));
};

Pascal.prototype.fractal = function() {
	return this.each((e) => e%2 === 0);
};

Pascal.prototype.toCanvas = function() {

};
