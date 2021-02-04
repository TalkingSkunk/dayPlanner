//moment.js
let presentTime = moment().format("HH00");   //military time
console.log(presentTime);
let todayDate = moment().format("MMM Do YYYY"); //today's date
console.log(todayDate);

//today's date
$('#currentDay').append(`<strong>${todayDate}</strong>`);


//create an array of 24 hours for looping the row
let hoursDay = Array.from(Array(24).keys());
console.log(hoursDay);


//the for loop for rows for (each hour * 24)
for (let i = 0; i < hoursDay.length; i++) {
    let myTime = i;
    let myTime2 = ("0" + myTime).slice(-2); //preset 2 digits for hour
    let eachHour = myTime2 + "00"; // make hours into military
    //the HTML block code to be looped
    $('#timetable').append(`
    <div id="row${i}" class="row overflow-hidden" style="border: 1px solid black;">
        <div id="time${i}" class="col-12 col-md-1">${eachHour}</div>
        <div id="timeInfo" class="col-12 col-md-9">
            <input id="timeForm${i}" type="text" class="form-control" value="${localStorage[eachHour] || ""}" />
        </div>
        <div id="timeSave" class="col-12 col-md-1">
            <button id="saveBtn${i}" onClick="save(event, ${i})" type="button" class="btn btn-dark">Save</button>
        </div>
    </div>`);
    // make grey the past hours
    if (eachHour < presentTime) {
        $(`#row` + i).css("background-color", "grey");
    }
    // make red the present hour
    if (eachHour === presentTime) {
        $(`div:contains(${eachHour})`).css("background-color", "red");
    }
    // make green the future hours
    if (eachHour > presentTime) {
        $(`div:contains(${eachHour})`).css("background-color", "green");
    }
}


// when save button is clicked
function save(event, hour) {
    event.preventDefault();
    console.log(`[saveBtn] pressed`);
    let userTime = document.querySelector(`#time${hour}`).innerText;
    let userInput = document.querySelector(`#timeForm${hour}`).value;
    let userInput2 = "";
    console.log(`[saved at] ${userTime}`);
    console.log(`[info saved] ${userInput}`);
    console.log(`[saving data from] #timeForm`);
    if (userInput)
        localStorage[userTime] = userInput;
    else
        localStorage[userTime] = userInput2;
}