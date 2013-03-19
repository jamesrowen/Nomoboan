angular.module('project', []).
	config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:ContactsCtrl, templateUrl:'index'});
	});

function ContactsCtrl($scope, $http, $location) {
  $http.get('/api/contacts').
    success(function(data, status, headers, config) {
      $scope.contacts = data;
    });
 
  $scope.addContact = function() {
  	$http.post('/api/addcontact', $scope.form).
  		success(function(data) {
		  	$http.get('/api/contacts').
		    	success(function(data, status, headers, config) {
		      		$scope.contacts = data;
		    	});
  			});
    //$scope.contacts.push({name:$scope.name, email:$scope.email});
    $scope.form.name = '';
    $scope.form.email = '';
  };
}