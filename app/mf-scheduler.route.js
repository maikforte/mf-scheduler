angular.module("MFSchedulerApp")

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    
    var stateHome = {
        "name" : "home",
        "url" : "/home",
        "templateUrl" : "./views/home.html"
    };
    
    var stateScheduler = {
        "name" : "scheduler",
        "url" : "/scheduler",
        "templateUrl" : "./views/scheduler.html",
        "controller" : "SchedulerController"
    };
    
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state(stateHome);
    $stateProvider.state(stateScheduler);
});