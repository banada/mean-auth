(function() {

angular
    .module('authApp')
    .controller('loginController', loginController);

loginController.$inject = ['$scope', '$location', 'authentication'];

function loginController($scope, $location, authentication) {

    $scope.credentials = {
        email: "",
        password: ""
    };

    $scope.onSubmit = function() {
        authentication
            .login($scope.credentials)
            .then(function() {
                // Go to profile after logging in
                $location.path('profile');
            }, function(error) {
                alert(error.statusText);
            });
    };
}

})();
