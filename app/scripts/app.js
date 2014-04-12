'use strict';

angular.module('pascal', []);

var Pascal = function(n) {
	this.grid = [];
	this.n = n;
};

Pascal.prototype.fillGrid = function() {
	this.grid = [];
	var x = [1], i;
	for(i in this.multiplexArray(x, this.n)) {
		this.grid.push(x)
		x = 
	}
};