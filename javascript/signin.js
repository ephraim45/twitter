document.getElementById("click").onclick = function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    window.location.href = "/home.html"
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}