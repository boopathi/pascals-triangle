'use strict';

var Pascal = function(n) {
	this.grid = [];
	this.n = n;
	this.fillGrid();
};

Pascal.prototype.multiplexArray = function(a, n) {
	var ret = [], i, x;
	for(i=0;i<n;i++) {
		for(x in a) {
			ret.push(a[x]);
		}
	}
	return ret;
};

Pascal.sum = function(e) {
	return _.reduce(e, function(memo,num) {
		return memo+num;
	}, 0);
};

Pascal.prototype.fillGrid = function() {
	this.grid = [];
	var x=[1], i;
	for(i=0;i<this.n;i++) {
		this.grid.push(x);
		x = _.map(_.zip([0].concat(x), x.concat([0])), Pascal.sum);
	}
	return this.grid;
};

Pascal.prototype.each = function(fn) {
	var result = [];
	_.each(this.grid, function(row, i) {
		var tmp = [];
		_.each(row, function(e, j) {
			tmp.push(fn(e,i,j));
		});
		result.push(tmp);
	});
	return result;
};

Pascal.prototype.getPrimes = function() {
	var primes = [2,3,5,7,11,13,17,19,23];
	return this.each(function(e) {
		return _.contains(primes, e);
	});
};

Pascal.prototype.getFractal = function() {
	return this.each(function(e) {
		return e%2 === 0;
	});
};