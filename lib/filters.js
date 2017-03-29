var exports = module.exports = {};

exports.listHours = function(request, response) {
    var hoursList = [];
    for(i = 0; i < 24; i ++ ) {
        var hour = {
            "label" : null,
            "value" : 0
        };
        
        if(i == 0) {
            hour.label = "12AM";
            hour.value = i;
        } else if (i == 12) {
            hour.label = i + "PM";
            hour.value = i;
        } else if (i > 12){
            hour.label = (i - 12) + "PM";
            hour.value = i;
        } else {
            hour.label = i + "AM";
            hour.value = i;
        }
        
        hoursList.push(hour);
    };
    
    response.json(hoursList);
};

exports.listIntervals = function(request, response) {
    var intervalsList = [];
    for(i = 0; i <= 30; i += 15) {
        var interval = {
            "label" : null,
            "value" : 0
        };
        
        interval.label = i + "m";
        interval.value = i;
        
        intervalsList.push(interval);
    }
    
    response.json(intervalsList);
}