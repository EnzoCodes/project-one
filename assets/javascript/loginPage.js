(function () {
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


    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    //Login Event
    btnLogin.addEventListener('click', e => {
        //Grabbing Email/Pass from form
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign In
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

    });
//
// auth.signInWithEmailAndPassword(email, pass);
//
// auth.createUserWithEmailAndPassword(email, pass);
//
// auth.onAuthStateChanged(firebaseUser => { });

}());
