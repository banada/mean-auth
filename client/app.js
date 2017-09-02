(function() {

    angular.module('authApp', ['ngRoute']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'profile/profile_view.html',
            controller: 'profileController',
        })
        .when('/register', {
            templateUrl: 'auth/register/register_view.html',
            controller: 'registerController'
        })
        .when('/login', {
            templateUrl: 'auth/login/login_view.html',
            controller: 'loginController'
        })
        .when('/profile', {
            templateUrl: 'profile/profile_view.html',
            controller: 'profileController'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }

    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
            // Redirect home if not signed in
            if ((($location.path() === '/profile') || ($location.path() === '/')) && (!authentication.isAuthenticated())) {
                $location.path('/login');
            }
        });
    }

    angular
        .module('authApp')
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', 'authentication', run]);

})();
