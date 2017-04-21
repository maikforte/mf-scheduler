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
                name: "ASD",
                description: "ASD"
            };
            $scope.taskList.push(task);
            task = {
                name: "DD",
                description: "DD"
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
                            $scope.hoursIntervalList[i].dayList[j].task = {
                                "name": null
                            };
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
            $scope.tdHeight = 50;
            fetchHours();
            fetchDays();
            fetchIntervals();
            $scope.taskList = SchedulerService.taskList;
            $scope.resizingIntervalValue = null;
            $scope.resizingDayValue = null;
            $scope.resizeTaskSize = null;
            $scope.resizingTask = null;
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
                                $scope.hoursIntervalList[i].dayList[j].height = $scope.tdHeight;
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            calibrateSchedule();
            $scope.selectedTask = null;
        };

        var calibrateSchedule = function () {
            dayList: for (dayIndex = 0; dayIndex < $scope.hoursIntervalList[0].dayList.length - 1; dayIndex++) {
                var temp = $scope.hoursIntervalList[0].dayList[dayIndex];
                var multiplier = 1;
                var additionalPixel = 1;
                comparator: for (comparatorIndex = 0; comparatorIndex < $scope.hoursIntervalList.length - 1; comparatorIndex++) {
                    if (temp.task.name != null &&
                        $scope.hoursIntervalList[comparatorIndex + 1].dayList[dayIndex].task.name &&
                        compareStr(temp.task.name, $scope.hoursIntervalList[comparatorIndex + 1].dayList[dayIndex].task.name) == 0) {
                        multiplier += 1;
                        $scope.hoursIntervalList[comparatorIndex + 1].dayList[dayIndex].hasSchedule = false;
                        temp.hasSchedule = true;
                    } else {
                        temp.height = ($scope.tdHeight * multiplier) + (additionalPixel * multiplier) - 2;
                        multiplier = 1;
                        temp = $scope.hoursIntervalList[comparatorIndex + 1].dayList[dayIndex];
                    }
                }
            }
        };

        var compareStr = function (s1, s2) {
            return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
        }

        $window.windowDrop = function (event) {
            event.preventDefault();
        };

        /* Resize functions */
        $scope.startResize = function (hoursInterval, day, event) {
            $scope.resizingIntervalValue = hoursInterval.value;
            $scope.resizingDayValue = day.value;
            $scope.resizingTask = day.task;
            event.preventDefault();

            for (intervalIndex = 0; intervalIndex < $scope.hoursIntervalList.length; intervalIndex++) {
                for (dayIndex = 0; dayIndex < $scope.hoursIntervalList[intervalIndex].dayList.length; dayIndex++) {
                    if ($scope.hoursIntervalList[intervalIndex].value == $scope.resizingIntervalValue && $scope.hoursIntervalList[intervalIndex].dayList[dayIndex].value == $scope.resizingDayValue) {
                        $scope.hoursIntervalList[intervalIndex].dayList[dayIndex].tempHeight = $scope.tdHeight;
                        break;
                    }
                }
            }
        };

        $scope.endResize = function () {
            if ($scope.resizingIntervalValue != null &&
                $scope.resizingDayValue != null) {
                $scope.confirmResize($scope.resizeTaskSize);
                for (intervalIndex = 0; intervalIndex < $scope.hoursIntervalList.length; intervalIndex++) {
                    for (dayIndex = 0; dayIndex < $scope.hoursIntervalList[intervalIndex].dayList.length; dayIndex++) {
                        if ($scope.hoursIntervalList[intervalIndex].value == $scope.resizingIntervalValue && $scope.hoursIntervalList[intervalIndex].dayList[dayIndex].value == $scope.resizingDayValue) {
                            $scope.hoursIntervalList[intervalIndex].dayList[dayIndex].isResizing = false;
                            $scope.resizingIntervalValue = null;
                            $scope.resizingDayValue = null;
                            break;
                        }
                    }
                }
            }
        };

        /**
         * Function is called when the mouse hovers on a schedule <td> element.
         */
        $scope.resize = function (hoursInterval, day) {
            console.log(hoursInterval.value);
            console.log($scope.resizingIntervalValue);
            if (!$scope.resizingIntervalValue == null && !$scope.resizingDayValue == null || hoursInterval.value > $scope.resizingIntervalValue) {
                var incrementSize = 1 + (hoursInterval.value - $scope.resizingIntervalValue);
                for (intervalIndex = 0; intervalIndex < $scope.hoursIntervalList.length; intervalIndex++) {
                    for (dayIndex = 0; dayIndex < $scope.hoursIntervalList[intervalIndex].dayList.length; dayIndex++) {
                        if ($scope.hoursIntervalList[intervalIndex].value == $scope.resizingIntervalValue && $scope.hoursIntervalList[intervalIndex].dayList[dayIndex].value == $scope.resizingDayValue) {
                            $scope.hoursIntervalList[intervalIndex].dayList[dayIndex].tempHeight = ($scope.tdHeight * incrementSize) + (hoursInterval.value - $scope.resizingIntervalValue) - 2;
                            $scope.resizeTaskSize = hoursInterval.value;
                            break;
                        }
                    }
                }
                //                var incrementSize = 1 + (hoursInterval.value - $scope.resizingIntervalValue);

            }
        };

        $scope.confirmResize = function (hoursIntervalValue) {
            if (!$scope.resizingIntervalValue == null && !$scope.resizingDayValue && null || hoursIntervalValue > $scope.resizingIntervalValue) {
                for (intervalIndex = $scope.resizingIntervalValue; intervalIndex < $scope.hoursIntervalList.length; intervalIndex++) {
                    if ($scope.hoursIntervalList[intervalIndex].value <= hoursIntervalValue) {
                        for (dayIndex = 0; dayIndex < $scope.hoursIntervalList[intervalIndex].dayList.length; dayIndex++) {
                            if ($scope.hoursIntervalList[intervalIndex].dayList[dayIndex].value == $scope.resizingDayValue) {
                                $scope.hoursIntervalList[intervalIndex].dayList[dayIndex].task = $scope.resizingTask;
                                $scope.hoursIntervalList[intervalIndex].dayList[dayIndex].hasSchedule = true;
                            }
                        }
                    }
                }
                $scope.resizeTaskSize = null;
                calibrateSchedule();
            }
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
