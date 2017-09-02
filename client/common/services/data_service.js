(function() {
    
    angular
        .module('authApp')
        .service('dataService', dataService);

    dataService.$inject = ['$http', 'authentication'];
    
    function dataService($http, authentication) {

        let getProfile = function() {
            return $http.post('/api/profile', null, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        return {
            getProfile: getProfile
        };

    }
})();
