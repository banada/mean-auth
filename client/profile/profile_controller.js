(function() {

angular
    .module('authApp')
    .controller('profileController', profileController);

profileController.$inject = ['$scope', '$location', 'dataService'];

function profileController($scope, $location, dataService) {
   
    $scope.user = {};

    dataService
        .getProfile()
        .then(function(response) {
            $scope.user = response.data;
        }, function(error) {
            console.log(error);
        });
}

})();
