// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist
var taskList = {
    description: []
};

var setHeaderDate = function() {
    var currentDate = moment().format("MMM DD, YYYY");
    $("#currentDay").text(currentDate);
}

var taskColors = function() {
    var currentHour = moment().format("H");
    currentHour = JSON.parse(currentHour);
    var numHours = $(".time-block").length;

    for (i = 0; i < numHours; i++) {
        var hour = $(".hour span")[i].textContent;
        // if the hour is PM, add 12 hours to the number to match current time HH format
        if (hour.includes("P.M.") && !hour.includes("12")) {
            var add = 12;
        }
        else {
            // if A.M. do not add hours
            var add = 0;
        }
        // extract only the number from the hour text
        hour = hour.substring(0,2).trim();
        // convert to number
        hour = JSON.parse(hour);
        hour = hour + add;
        if (hour < currentHour) {
            $(".description").eq(i).addClass("past");
        }
        else if (hour == currentHour) {
            $(".description").eq(i).addClass("current");
        }
        else if (hour > currentHour) {
            $(".description").eq(i).addClass("future");
        }
    }
}

// when save button is clicked
$(".saveBtn").click(function() {
    // get value user input for task description
    var taskIndex = $(".saveBtn").index(this);
    var taskDescription = $(this).siblings(".description").val();
    taskList.description[taskIndex] = taskDescription;
    localStorage.setItem("tasks", JSON.stringify(taskList));
})

var loadTasks = function() {
    if (localStorage.getItem("tasks")) {
        taskList = JSON.parse(localStorage.getItem("tasks"));
        console.log(taskList)
        for (i = 0; i < taskList.description.length; i++) {
            if (taskList.description[i]) {
                console.log(taskList.description[i]);
                $(".description").eq(i).val(taskList.description[i]);
            }
        }
    }
}

loadTasks();
setHeaderDate();
taskColors();