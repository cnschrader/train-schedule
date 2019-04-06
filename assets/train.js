// Initializing firebase
var config = {
    apiKey: "AIzaSyDWv9DIVYTp52e-DT3c3IRJ1FF6aGT_mDg",
    authDomain: "train-schedule-6ae9d.firebaseapp.com",
    databaseURL: "https://train-schedule-6ae9d.firebaseio.com",
    projectId: "train-schedule-6ae9d",
    storageBucket: "train-schedule-6ae9d.appspot.com",
    messagingSenderId: "872686978577"
  };
 
  firebase.initializeApp(config);

  var database = firebase.database();


// onclick button to create a new train
  $(".btn").on("click", function(){
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        time: firstTime,
        frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    swal("Nice!", "You added a train!", "success");



    $("#train-name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");




  });

  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

      var name = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var time = childSnapshot.val().time;
      var frequency = childSnapshot.val().frequency;

      var trainFreq = frequency;
      var firstArrival = time;

      var firstTimeConverted = moment(firstArrival, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      var currentTime = moment();
      console.log(currentTime.format("hh:mm"));

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log(diffTime);

      var tRemainder = diffTime % trainFreq;
      console.log(tRemainder);

      var trainMinutes = trainFreq - tRemainder;
      console.log(trainMinutes);

      var nextTrain = moment().add(trainMinutes, "minutes");

      var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(trainMinutes),
        
      );

      $("#train-table > tbody").append(newRow);
    
  });