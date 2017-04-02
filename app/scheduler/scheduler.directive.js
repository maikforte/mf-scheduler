angular.module("SchedulerApp")

    .directive("mfTaskDropDown", function () {
        return {
            "templateUrl": "./views/template/sidenav-task.tmpl.html"
        };
    })

    .directive("mfSettingsDropDown", function () {
        return {
            "templateUrl": "./views/template/sidenav-settings.tmpl.html"
        };
    })

    .directive("mfExportDropDown", function () {
        return {
            "templateUrl": "./views/template/sidenav-export.tmpl.html"
        };
    })

    .directive("mfWeeklyScheduler", function () {
        return {
            "templateUrl": "./views/template/weekly-scheduler.tmpl.html"
        };
    });
