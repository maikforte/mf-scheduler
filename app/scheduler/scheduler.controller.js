angular.module("SchedulerApp")

    .controller("SchedulerController", function ($scope, $mdDialog, $window, SchedulerService) {
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

        var demoTask = function () {
            var task = {
                name: "ASD"
            };
            $scope.taskList.push(task);
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
                    for (i = 0; i < $scope.hoursIntervalList.length; i++) {
                        $scope.hoursIntervalList[i].dayList = angular.copy($scope.dayList);
                        for (j = 0; j < $scope.hoursIntervalList[i].dayList.length; j++) {
                            $scope.hoursIntervalList[i].dayList[j].hasSchedule = false;
                        }
                    };
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
            fetchDays();
            fetchIntervals();
            $scope.taskList = SchedulerService.taskList;
            demoTask();
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
        };

        $window.windowAllowDrag = function (event) {
            event.preventDefault();
        };

        $scope.onDrag = function (task) {
            $scope.selectedTask = task;
        };

        $window.windowDrag = function (event) {
            event.dataTransfer.setData("task", JSON.stringify($scope.selectedTask));
        };

        $scope.onDrop = function (hoursInterval, day) {
            for (i = 0; i < $scope.hoursIntervalList.length; i++) {
                if (parseFloat($scope.hoursIntervalList[i].value) == parseFloat(hoursInterval.value)) {
                    for (j = 0; j < $scope.hoursIntervalList[i].dayList.length; j++) {
                        if (parseInt($scope.hoursIntervalList[i].dayList[j].value) == parseInt(day.value)) {
                            if ($scope.selectedTask != null) {
                                $scope.hoursIntervalList[i].dayList[j].task = $scope.selectedTask;
                                $scope.hoursIntervalList[i].dayList[j].hasSchedule = true;
                                break;
                            } else {
                                console.log("NULL");
                                break;
                            }
                        }
                    }
                }
            }
            $scope.selectedTask = null;
        };

        $window.windowDrop = function (event) {
            event.preventDefault();
        };

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
