angular.module("WeeklySchedulerApp")

.service("WeeklySchedulerService", function(HTTPService) {
    this.taskList = [];
    
    this.listTaskType = function() {
        console.log("TEST");
        return HTTPService.get("/task-type", null);  
    };
});