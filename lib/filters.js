var exports = module.exports = {};

exports.listHours = function (request, response) {
    var hoursList = [];
    for (i = 0; i < 24; i++) {
        var hour = {
            "label": null,
            "value": 0
        };

        if (i == 0) {
            hour.label = "12AM";
            hour.value = i;
        } else if (i == 12) {
            hour.label = i + "PM";
            hour.value = i;
        } else if (i > 12) {
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

exports.listIntervals = function (request, response) {
    var intervalsList = [];
    for (i = 0; i <= 30; i += 15) {
        var interval = {
            "label": null,
            "value": 0
        };

        interval.label = (i == 0 ? 60 : i) + "m";
        interval.value = (i == 0 ? 60 : i);

        intervalsList.push(interval);
    }

    response.json(intervalsList);
};

exports.listDays = function (request, response) {
    var data = [
        {
            "label": "Monday",
            "value": 1
                },
        {
            "label": "Tuesday",
            "value": 2
                },
        {
            "label": "Wednesday",
            "value": 3
                },
        {
            "label": "Thursday",
            "value": 4
                },
        {
            "label": "Friday",
            "value": 5
                },
        {
            "label": "Saturday",
            "value": 6
                },
        {
            "label": "Sunday",
            "value": 7
                }
            ];

    response.json(data);
};

exports.listHoursInterval = function (request, response) {
    var interval = parseInt(request.query.interval);
    var startHour = parseInt(request.query.startHour);
    var endHour = parseInt(request.query.endHour);
    var hoursIntervalList = [];

    for (startHour; startHour <= endHour; startHour++) {

        if (startHour == endHour) {
            interval = 60;
        };

        for (var tempInterval = 0; tempInterval < 60; tempInterval += interval) {
            var hoursInterval = {
                "label": null,
                "value": 0
            };

            var percentage = (tempInterval / 60);

            if (startHour == 0) {
                hoursInterval.label = 12 + ":" + (tempInterval == 0 ? "00" : tempInterval) + "AM";
                hoursInterval.value = startHour + (percentage == 1 ? 0 : percentage);
            } else if (startHour == 12) {
                hoursInterval.label = startHour + ":" + (tempInterval == 0 ? "00" : tempInterval) + "PM";
                hoursInterval.value = startHour + (percentage == 1 ? 0 : percentage);
            } else if (startHour > 12) {
                hoursInterval.label = (startHour - 12) + ":" + (tempInterval == 0 ? "00" : tempInterval) + "PM";
                hoursInterval.value = startHour + (percentage == 1 ? 0 : percentage);
            } else {
                hoursInterval.label = startHour + ":" + (tempInterval == 0 ? "00" : tempInterval) + "AM";
                hoursInterval.value = startHour + (percentage == 1 ? 0 : percentage);
            }

            hoursIntervalList.push(hoursInterval);

        }
    }

    response.json(hoursIntervalList);
};
