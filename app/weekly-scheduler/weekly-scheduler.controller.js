angular.module("WeeklySchedulerApp")

.controller("WeeklySchedulerController", function($scope, $mdDialog, WeeklySchedulerService) {
    $scope.init = function() {
        $scope.isSettingsOn = false;
        $scope.isTaskOn = false;
        $scope.isExportOn = false;
        $scope.taskList = WeeklySchedulerService.taskList;
    };
    
    $scope.turnOn = function(header) {
        switch(header) {
            case "settings" :
                $scope.isSettingsOn = !$scope.isSettingsOn;
                break;
            case "task" :
                $scope.isTaskOn = !$scope.isTaskOn;
                break;
            case "export" :
                $scope.isExportOn = !$scope.isExportOn;
                break;
        };
    };
    
    $scope.showNewTask = function(event) {
        $mdDialog.show({
          controller: "NewTaskController",
          templateUrl: "./views/template/new-task.tmpl.html",
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: true
        });
    }
    
    $scope.init();
})

.controller("NewTaskController", function($scope, $mdDialog, WeeklySchedulerService) {
    var fetchTaskType = function() {
        WeeklySchedulerService.listTaskType().then(
            function(successCallback) {
                $scope.taskTypeList = successCallback.data;
            }, function(errorCallback) {
                console.log(errorCallback);
            }
        );
    };
    
    $scope.init = function() {
        $scope.newTask = {
            "name" : null,
            "description" : null,
            "type" : {}
        };
        $scope.taskTypeList = [];
        fetchTaskType();
    };
    
    $scope.addNewTask = function(newTask) {
        WeeklySchedulerService.taskList.push(newTask);
        $scope.closeDialog();
    };
    
    $scope.closeDialog = function() {
        $mdDialog.cancel();
    };
    
    $scope.init();
});