var exports = module.exports = {};

exports.listTaskType = function(request, response) {
    var data = [
        {
            "name" : "Subject",
            "icon" : "access_time"
        },
        {
            "name" : "Travel",
            "icon" : "flight_takeoff"
        },
        {
            "name" : "Payment",
            "icon" : "payment"
        },
        {
            "name" : "Shopping",
            "icon" : "shopping_cart"
        },
        {
            "name" : "Assignment",
            "icon" : "assignment"
        },
        {
            "name" : "Meeting",
            "icon" : "supervisor_account"
        },
        {
            "name" : "Other",
            "icon" : "note"
        }
    ];
    
    response.json(data);
};