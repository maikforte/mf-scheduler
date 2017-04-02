angular.module("SchedulerApp")

    .controller("SchedulerController", function ($scope, $mdDialog, SchedulerService) {
        var fetchHours = function () {
            SchedulerService.listHours().then(
                function (successCallback) {
                    $scope.hoursList = successCallback.data;
                    $scope.selectedStartHour = $scope.hoursList[0].value;
                    $scope.selectedEndHour = $scope.hoursList[$scope.hoursList.length - 1].value;
                },
                function (errorCallback) {
                    console.log(errorCallback);
                }
            );
        };

        var fetchIntervals = function () {
            SchedulerService.listIntervals().then(
                function (successCallback) {
                    $scope.intervalsList = successCallback.data;
                    $scope.selectedInterval = $scope.intervalsList[0].value;
                    $scope.fetchHoursInterval($scope.selectedStartHour, $scope.selectedEndHour, $scope.selectedInterval);
                },
                function (errorCallback) {
                    console.log(errorCallback);
                }
            );
        };

        var fetchDays = function () {
            SchedulerService.listDays().then(
                function (successCallback) {
                    $scope.dayList = successCallback.data;
                },
                function (errorCallback) {
                    console.log(errorCallback);
                }
            );
        };

        $scope.fetchHoursInterval = function (startHour, endHour, interval) {
            SchedulerService.listHoursInterval(startHour, endHour, interval).then(
                function (successCallback) {
                    $scope.hoursIntervalList = successCallback.data;
                },
                function (errorCallback) {
                    console.log(errorCallback);
                }
            );
        };

        $scope.init = function () {
            $scope.hoursList = [];
            $scope.hoursIntervalList = [];
            $scope.intervalsList = [];
            $scope.dayList = [];
            $scope.selectedStartHour = 0;
            $scope.selectedEndHour = 0;
            $scope.selectedInterval = 0;
            fetchHours();
            fetchIntervals();
            fetchDays();
            $scope.isSettingsOn = false;
            $scope.isTaskOn = false;
            $scope.isExportOn = false;
            $scope.taskList = SchedulerService.taskList;
        };

        $scope.turnOn = function (header) {
            switch (header) {
                case "settings":
                    $scope.isSettingsOn = !$scope.isSettingsOn;
                    break;
                case "task":
                    $scope.isTaskOn = !$scope.isTaskOn;
                    break;
                case "export":
                    $scope.isExportOn = !$scope.isExportOn;
                    break;
            };
        };

        $scope.showNewTask = function (event) {
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

    .controller("NewTaskController", function ($scope, $mdDialog, SchedulerService) {
        var fetchTaskType = function () {
            SchedulerService.listTaskType().then(
                function (successCallback) {
                    $scope.taskTypeList = successCallback.data;
                },
                function (errorCallback) {
                    console.log(errorCallback);
                }
            );
        };

        $scope.init = function () {
            $scope.newTask = {
                "name": null,
                "description": null,
                "type": {}
            };
            $scope.taskTypeList = [];
            fetchTaskType();
        };

        $scope.addNewTask = function (newTask) {
            SchedulerService.taskList.push(newTask);
            $scope.closeDialog();
        };

        $scope.closeDialog = function () {
            $mdDialog.cancel();
        };

        $scope.init();
    });
