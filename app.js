// 1. Initialize Firebase
 var config = {
    apiKey: "AIzaSyDOMsUk1MiicMpCaR_qm_2o1GWrhc-WvL4",
    authDomain: "firstproject-75bcf.firebaseapp.com",
    databaseURL: "https://firstproject-75bcf.firebaseio.com",
    projectId: "firstproject-75bcf",
    storageBucket: "firstproject-75bcf.appspot.com",
    messagingSenderId: "162145473827"
  };
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#train-dest-input").val().trim();
  //var trainTime = moment($("#train-time-input").val().trim(),"HH:mm").subtract(1, 'years').format('X');
  var trainTime = moment($("#train-time-input").val().trim(),"HH:mm").format('X');
  var trainFreq = $("#train-freq-input").val().trim();



  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    time: trainTime,
    freq: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#train-dest-input").val("");
  $("#train-time-input").val("");
  $("#train-freq-input").val("");

  });

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {


  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;

// 4.Calculations for train times

  //Current Time variable in military time format
    var currentTime = moment().format("HH:mm");
    console.log('Current Time: ' + currentTime);

  //Difference between Current Time and Train Arrival Time (formatted in minutes)
    var diffTime = moment().diff(moment.unix(trainTime), "minutes");
    console.log('Difference in Time: ' + diffTime);
  //Divide the difference in time by the train frequency, to obtain the remainder (modulo)
    var timeRemainder = diffTime % trainFreq;
    console.log('Time Remainder: ' + timeRemainder);
  //Difference between the train frequency and modulo is the time remaining
    var minutesRemaining = trainFreq - timeRemainder;
    console.log('Minutes Remaining: ' + minutesRemaining);
  //Next train arrival is the minutes remaining added to current time
    var nextTrainArrival = moment().add(minutesRemaining, "minutes").format("hh:mm"); 
    


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextTrainArrival + "</td><td>" + minutesRemaining + "</td></tr>");


});