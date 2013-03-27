// services
//---------
angular.module('project', []).
	config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ContactsCtrl, templateUrl:'partials/contacts'}).
      otherwise({redirectTo:'/'});
	});


// controllers
//------------

function ContactsCtrl($scope, $http, $location) {
  $http.get('/api/contacts').
    success(function(data, status, headers, config) {
      $scope.contacts = data;
    });
 
  $scope.addContact = function() {
    $http.post('/api/addcontact', $scope.form).
      success(function(data) {
        $scope.contacts.push(data);
        $scope.form.name = '';
        $scope.form.email = '';
        $scope.form.phone = '';
        $scope.form.location = '';
        $("#collapseOne").collapse('toggle');
      });
  };
 
  $scope.delete = function(id) {
    $http.post('/api/deletecontact/' + id).
      success(function(data) {
        for (var i=0; i < $scope.contacts.length; ++i)
          if ($scope.contacts[i]._id == id)
          {
            $scope.contacts.splice(i, 1);
            return;
          }
      });
  };
 
  $scope.edit = function(contact, name) {
    contact.edit = name;
  };
 
  $scope.update = function(contact) {
    $http.put('/api/updatecontact/' + contact._id, contact).
      success(function(data) {
        // for (var i=0; i < $scope.contacts.length; ++i)
          // if ($scope.contacts[i]._id == contact.id)
          // {
            // $scope.contacts[i] = data;
            // break;
          // }
        contact.edit = '';
      });
  };
}