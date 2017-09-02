(function() {

angular
    .module('authApp')
    .controller('registerController', registerController);

registerController.$inject = ['$scope', '$location', 'authentication'];

function registerController($scope, $location, authentication) {

    $scope.credentials = {
        name: "",
        email: "",
        password: ""
    };

    $scope.onSubmit = function() {
        authentication
            .register($scope.credentials)
            .then(function() {
                // Go to profile after successful registration
                $location.path('profile');
            }, function(error) {
                alert(error);
            });
    };
}

})();
