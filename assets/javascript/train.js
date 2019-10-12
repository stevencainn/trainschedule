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

//firebase watcher and initial loader. HINT: this code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot){
    //log everything coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().startTime);
    console.log(childSnapshot.val().frequency);


    //appends data back to table 
    $("tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().startTime + "</td><<td>" + childSnapshot.val().frequency + "</td></tr>");
}, function(errorObject){
    console.log("Errors handled: " + errorObject.code);
});



