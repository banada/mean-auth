(function() {

    angular
        .module('authApp')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];

    function authentication($http, $window) {
        let saveToken = function(token) {
            $window.localStorage['auth-token'] = token;
        };

        let getToken = function() {
            return $window.localStorage['auth-token'];
        };

        let isAuthenticated = function() {
            let token = getToken();
            let payload;
            if (token) {
                // JWT has three parts: header, payload, signature
                payload = token.split('.')[1];
                // Decode payload from JWT
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                // Return true if the token is still valid
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        let getUser = function() {
            if (isAuthenticated()) {
                let token = getToken();
                let payload = token.split('.')[1];
                // Decode payload from JWT
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return {
                    email: payload.email,
                    name: payload.name
                }
            }
        };

        register = function(user) {
            self.logout();
            return $http.post('/api/register', user)
                .then(function(response) {
                    saveToken(response.data.token);
                });
        };

        login = function(user) {
            self.logout();
            return $http.post('/api/login', user)
                .then(function(response) {
                    saveToken(response.data.token);
                });
        };

        logout = function() {
            $window.localStorage.removeItem('auth-token');
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            isAuthenticated: isAuthenticated,
            getUser: getUser,
            register: register,
            login: login,
            logout: logout
        };

    }

})();
