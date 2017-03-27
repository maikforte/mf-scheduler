angular.module("SchedulerApp")

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    
    var stateHome = {
        "name" : "home",
        "url" : "/home",
        "templateUrl" : "./views/home.html"
    };
    
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state(stateHome);
});