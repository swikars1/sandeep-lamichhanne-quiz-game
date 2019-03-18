// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCkasK766oZWbGJfGp8JYoXNIMoP03Pyho",
  authDomain: "fb-quiz-app.firebaseapp.com",
  databaseURL: "https://fb-quiz-app.firebaseio.com",
  projectId: "fb-quiz-app",
  storageBucket: "fb-quiz-app.appspot.com",
  messagingSenderId: "1076655506884"
};
firebase.initializeApp(firebaseConfig);

function writeUserData(userId, first_name, last_name) {
  firebase
    .database()
    .ref("winners/" + userId)
    .set(
      {
        first_name: first_name,
        last_name: last_name
      },
      function(error) {
        if (error) {
          // The write failed...
          console.error("write failed");
        } else {
          // Data saved successfully!
          console.log("write done");
        }
      }
    );
}
writeUserData("asd3", "swiakr", "asd");
