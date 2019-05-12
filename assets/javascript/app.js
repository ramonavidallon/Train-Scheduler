  // INITIALIZING FIREBASE
  var config = {
    apiKey: "AIzaSyA_zh1I0TXKYxBOkRQ9OEjaGSXxFvB3lUs",
    authDomain: "train-schedule-f14ef.firebaseapp.com",
    databaseURL: "https://train-schedule-f14ef.firebaseio.com",
    projectId: "train-schedule-f14ef",
    storageBucket: "train-schedule-f14ef.appspot.com",
    messagingSenderId: "5456520797"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //ON CLICK FUNCTION TO ADD A TRAINT TO THE SCHEDULE//
  $("#new-train").submit(function(event){
    var trainName = $("#train-input").val();
    var destination = $("#destination-input").val();
    var startTime = $("#time-input").val();
    var frequency = $("#frequency-input").val();
    var trainSubmit = {
      name: trainName,
      destination: destination,
      start: startTime,
      frequency: frequency,
    };

    database.ref().push(trainSubmit);
    
    alert("You've successfully added a train to " + destination);

    $("#train-input").val();
    $("#destination-input").val();
    $("#time-input").val();
    $("#frequency-input").val();

    return false;
    
  })
  //FIREBASE EVENT FOR ADDING THE TRAIN INFORMATION TO THE DATABASE AND TO THE PAGE//
  database.ref().on("child_added", function(childSnapshot, prevChildKey){

    //STORING USER INFO INTO A VARIABLE
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var startTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;


    //VARIABLES TO GENERATE REAL TIME DATA ONTO THE PAGE//
    var convertedTime = moment(startTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var timeDiff = currentTime.diff(moment(convertedTime), "minutes");
    var remainingTime = timeDiff % frequency;
    var minutesTillTrain = frequency - remainingTime;
    var upcomingTrain = moment().add(remainingTime, "minutes");
    var formatTime = moment(upcomingTrain).format("HH:mm");

    $("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + formatTime + "</td><td>"  + minutesTillTrain + "</td></tr>");


  });





