  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCErquHn35UUkwgKPTmnjkxwKuEKQ0W8-w",
    authDomain: "train-schedule-e1f8e.firebaseapp.com",
    databaseURL: "https://train-schedule-e1f8e.firebaseio.com",
    projectId: "train-schedule-e1f8e",
    storageBucket: "",
    messagingSenderId: "379482326861"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Buttons for adding Trains
  $("#add-train-btn").on("click", function(event){

    //grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#first-train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    //creates local "temporary" object for holding train data

    var newTrain = {
      name: trainName,
      destination: destination,
      time: trainTime,
      frequency: frequency,
    };

    //uploads train data to the database
    database.ref().push(newTrain);

    //logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    //alert
    alert("Train added!");

    //clears all of the text boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

    });

  //create firebase event for adding trains to the database and a row in the html when user adds a train
  database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    //store everything into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    //train info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    //creating variables for data not stored in firebase


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextArrival = moment(nextTrain).format("hh:mm");



    //add each train's data into the table
    $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>")
  })

    //


