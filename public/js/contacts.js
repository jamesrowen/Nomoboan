function ContactsCtrl($scope) {
  $scope.contacts = [
    {name:'John Pon', email:'jptrill@werd.com'},
    {name:'Kenny Benny', email:'kenzbenz@yolo.com'}];
 
  $scope.addContact = function() {
    $scope.contacts.push({name:$scope.name, email:$scope.email});
    $scope.name = '';
    $scope.email = '';
  };
}