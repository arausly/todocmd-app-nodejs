const firebase = require('firebase'); 
const moment = require('moment');

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDY_2nw_8UJaLdCJ0dme2VeMQ2c3oooCOA",
    authDomain: "todo-app-nodejs.firebaseapp.com",
    databaseURL: "https://todo-app-nodejs.firebaseio.com",
    projectId: "todo-app-nodejs",
    storageBucket: "todo-app-nodejs.appspot.com",
    messagingSenderId: "608098593990"
  };


module.exports = {
	firebase,
	config
}
