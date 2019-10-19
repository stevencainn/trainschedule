//firebase key
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAQGNY81hVkRFlArYWaD1fEF0mNyAvavLU",
    authDomain: "train-schedule-5084b.firebaseapp.com",
    databaseURL: "https://train-schedule-5084b.firebaseio.com",
    projectId: "train-schedule-5084b",
    storageBucket: "",
    messagingSenderId: "223715700890",
    appId: "1:223715700890:web:aa84054d69061e778c6f23"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//create a variable to reference the database
var database = firebase.database();




//on click function for the submit button
$(".btn-submit").on("click", function (event) {
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var startTime = $("#startTime").val().trim();
    var frequency = $("#frequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);

    database.ref().push({
        name : name,
        destination : destination,
        startTime : startTime,
        frequency : frequency
    })
    //don't refresh the page
    return false;

});

//firebase watcher and initial loader.
database.ref().on("child_added", function(childSnapshot){
    //set childSnapshot to variables
    var childName = childSnapshot.val().name;
    var childDestination = childSnapshot.val().destination;
    var childStartTime = childSnapshot.val().startTime;
    var childFrequency = childSnapshot.val().frequency;
    console.log(childStartTime);
    // //create a moment object
    var minAway;
    //change the year so the first train comes before now
    var firstNewTrain = moment(childStartTime, "hh:mm").subtract(1, "years");
    //difference between the current and first train
    var diffTime = moment().diff(moment(firstNewTrain), "minutes");
    var remainder = diffTime % childFrequency;
    //minutes until next train
    minAway = childFrequency - remainder;
    //next train time 
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    var newRow = `<tr>
                    <td>${childName}</td>
                    <td>${childDestination}</td>
                    <td>${childFrequency}</td>
                    <td>${nextTrain}</td>
                    <td>${minAway} mins</td>
    </tr>`
    //append content to the display table
    $("tbody").append(newRow);
});




