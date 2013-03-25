angular.module('project', []).
	config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ContactsCtrl, templateUrl:'partials/contacts'}).
      when('/delete/:contactid', {controller:DeleteCtrl, templateUrl:'partials/contacts'});
	});

function ContactsCtrl($scope, $http, $location) {
  $http.get('/api/contacts').
    success(function(data, status, headers, config) {
      $scope.contacts = data;
    });
 
  $scope.addContact = function() {
    $http.post('/api/addcontact', $scope.form).
      success(function(data) {
        // $scope.contacts.push($scope.form);
        $scope.contacts.push({name:$scope.name, email:$scope.email, phone:$scope.phone, location:$scope.location});
        $scope.form.name = '';
        $scope.form.email = '';
        $scope.form.phone = '';
        $scope.form.location = '';
        $("#collapseOne").collapse('toggle');
      });
  };
 
  $scope.delete = function(id, index) {
    $http.post('/api/deletecontact/' + id).
      success(function(data) {
        $scope.contacts.splice(index, 1);
      });
  };
 
  // $scope.addContact = function() {
  //   $http.post('/api/addcontact', $scope.form).
  //     success(function(data) {
  //       $http.get('/api/contacts').
  //         success(function(data, status, headers, config) {
  //           $scope.contacts = data;
  //         });
  //       });
  //   //$scope.contacts.push({name:$scope.name, email:$scope.email});
  //   $scope.form.name = '';
  //   $scope.form.email = '';
  // };
}

function DeleteCtrl($scope, $http, $location, $routeParams) {
  $http.post('/api/deletecontact/' + $routeParams.contactid).
    success(function(data) {
      // do something
      $location.path('/');
    });
};

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