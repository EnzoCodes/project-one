// Initialize Firebase
var config = {
apiKey: "AIzaSyAKovIgnElTXfZog6-eGf7X3vU1I7go6yI",
authDomain: "imagewordmatch.firebaseapp.com",
databaseURL: "https://imagewordmatch.firebaseio.com",
projectId: "imagewordmatch",
storageBucket: "imagewordmatch.appspot.com",
messagingSenderId: "621229379920"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

function signIn() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.displayName);
    // ...
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    });
}
