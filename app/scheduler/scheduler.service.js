angular.module("SchedulerApp")

    .service("SchedulerService", function (HTTPService) {
        this.taskList = [];

        this.listTaskType = function () {
            return HTTPService.get("/get-task-type", null);
        };

        this.listHours = function () {
            return HTTPService.get("/get-hours", null);
        };

        this.listIntervals = function () {
            return HTTPService.get("/get-intervals", null);
        };

        this.listHoursInterval = function (startHour, endHour, interval) {
            var data = {
                "startHour": startHour,
                "endHour": endHour,
                "interval": interval
            };

            return HTTPService.get("/get-hours-interval", data);
        };

        this.listDays = function () {
            return HTTPService.get("/get-days", null);
        };
    });
