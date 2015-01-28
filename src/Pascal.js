var _ = require('lodash'),
	Bigint = require('./BigInteger');

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
		var res = memo.add(num);
		return res;
	}, Bigint.ZERO);
};

//
// Methods
//

// Pascal.prototype.multiplexArray = function(a, n) {
// 	var ret = [], i, x;
// 	for(i=0;i<n;i++) {
// 		for(x in a) {
// 			ret.push(a[x]);
// 		}
// 	}
// 	return ret;
// };

Pascal.prototype.fillGrid = function() {
	this.grid = [];
	var x=[Bigint.ONE], i;
	for(i=0;i<this._n;i++) {
		this.grid.push(x);
		x = _.map(
				_.zip(
					[Bigint.ZERO].concat(x),
					x.concat([Bigint.ZERO])
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
};

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

Pascal.prototype.all = function() {
	return this.each((e) => true);
};

Pascal.prototype.even = function() {
	return this.each((e) => e.modPow(Bigint.ONE,2).valueOf() === 0);
};

Pascal.prototype.odd = function() {
	return this.each((e) => e.modPow(Bigint.ONE,2).valueOf() === 1);
};

Pascal.prototype.primes = function() {
	var primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
	return this.each(function(e,i,j) {
		return _.contains(primes, i) && !(j===0 || j===i);
	});
}

Pascal.prototype.toCanvas = function() {

};
