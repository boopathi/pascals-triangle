'use strict';

pascal.controller('MainCtrl', function($scope) {

	$scope.N = 10;

	$scope.$watch('N', function nChanged(n){
		if(limitsN(n)) {
			$scope.pascal = new Pascal(parseInt(n));
			$scope.updateHightlights();
		} else {
			console.log('Max Limit for N reached');
		}
	});

	var limitsN = function(n) {
		return n<30 && n>0;
	};

	$scope.changeN = function() {
		if(limitsN(this.N)) {
			$scope.N = this.N;
		}
	};

	$scope.descN = function() {
		if(limitsN($scope.N-1)) {
			$scope.N--;
		}
	};

	$scope.incrN = function() {
		if(limitsN($scope.N+1)) {
			$scope.N++;
		}
	};

	$scope.currentView = 0;

	$scope.$watch('currentView', function() {
		$scope.updateHightlights();
	});

	$scope.selectView = function(i) {
		$scope.currentView = i;
	};

	$scope.views = DATA.pascal;

	$scope.updateHightlights = function() {
		$scope.highlights = $scope.pascal[DATA.pascal[$scope.currentView].func]();
	};

});