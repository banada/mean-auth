(function() {

angular
    .module('authApp')
    .controller('navigationController', navigationController);

navigationController.$inject = ['$scope', '$location', 'authentication'];

function navigationController($scope, $location, authentication) {

    $scope.isLoggedIn = authentication.isAuthenticated();

    $scope.currentUser = authentication.getUser();

    $scope.logout = function() {
        authentication.logout();
    }
}

})();
