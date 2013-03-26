angular.module('project', []).
	config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ContactsCtrl, templateUrl:'partials/contacts'});
	});

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
    $http.post('/api/updatecontact/' + contact._id, contact).
      success(function(data) {
        for (var i=0; i < $scope.contacts.length; ++i)
          if ($scope.contacts[i]._id == contact.id)
          {
            $scope.contacts[i] = data;
            break;
          }
        contact.edit = '';
      });
  };
}

// angular.module('mongo', ['ngResource']).
//     factory('Project', function($resource) {
//       var Project = $resource('https://api.mongolab.com/api/1/databases' +
//           '/angularjs/collections/projects/:id',
//           { apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
//             update: { method: 'PUT' }
//           }
//       );
 
//       Project.prototype.update = function(cb) {
//         return Project.update({id: this._id.$oid},
//             angular.extend({}, this, {_id:undefined}), cb);
//       };
 
//       Project.prototype.destroy = function(cb) {
//         return Project.remove({id: this._id.$oid}, cb);
//       };
 
//       return Project;
//     });