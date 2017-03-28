angular.module("SchedulerApp")

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    
    var stateHome = {
        "name" : "home",
        "url" : "/home",
        "templateUrl" : "./views/home.html"
    };
    
    var stateWeeklyScheduler = {
        "name" : "weekly-scheduler",
        "url" : "/weekly-scheduler",
        "templateUrl" : "./views/weekly-scheduler.html",
        "controller" : "WeeklySchedulerController"
    };
    
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state(stateHome);
    $stateProvider.state(stateWeeklyScheduler);
});