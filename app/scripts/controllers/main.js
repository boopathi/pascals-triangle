'use strict';

angular.module('pascal').controller('MainCtrl', function($scope) {

	$scope.currentView = 0;

	$scope.selectView = function(i) {
		$scope.currentView = i;
	};

	$scope.views = [
		{ name: 'Primes' },
		{ name: 'Powers of 2' },
		{ name: 'Elevens' },
		{ name: 'Hockey Stick Pattern' },
		{ name: 'Triangular numbers' },
		{ name: 'Square numbers' },
		{ name: 'Fibonocci' },
		{ name: 'Binomial expansion' },
	];
});