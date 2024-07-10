document.getElementById("signup").onclick = function(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;





firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...

    firebase.firestore().collection("users").doc(user.uid).set({
      username: name,
      useremail: email,
      userid: user.uid,
      profileImage: "https://firebasestorage.googleapis.com/v0/b/twitter-77675.appspot.com/o/default.png?alt=media&token=79652ca9-c856-4a15-b2ee-f5277f0a8d95",
      timestamp: new Date().getTime()
    }).then(()=>{

      window.location.href = "/signin.html"
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });


  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

}