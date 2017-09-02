(function() {

angular
    .module('authApp')
    .directive('navigation', navigation);;

function navigation() {
    return {
        restrict: 'EA',
        templateUrl: 'common/directives/navigation/navigation_view.html',
        controller: 'navigationController'
    }
}

})();
