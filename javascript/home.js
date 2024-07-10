
firebase.auth().onAuthStateChanged((user) =>{
    if(user){
        const uid = user.uid
        console.log(uid);
        firebase.firestore().collection("users").doc(uid).get().then((userdoc) => {
            let username = userdoc.data().username;
            let profileimg = userdoc.data().profileImage;
            console.log(username);
            document.getElementById("name").innerText = username;
            document.querySelector(".profile").src = profileimg;
            document.querySelector(".pic").src = profileimg;
          })
          document.getElementById("sendTweet").onclick = function() {
            let tweet = document.getElementById("tweet").value;
            let sendtweet = firebase.firestore().collection("tweets").doc();
            sendtweet
             .set({
                userId : uid,
                tweet : tweet,
                tweetId: sendtweet.id,
                timestamp : new Date().getTime()
             }).then(()=>{
                window.location.reload();
             }).catch((error)=>{
                console.log(error);
             });
          };
        firebase.firestore().collection("users").get().then(queryUser=>{
            queryUser.forEach(userDoc=>{
                let username = userDoc.data().username;
                const userid = userDoc.data().userid;



                console.log(username);
                firebase.firestore().collection("tweets").get().then(queryTweet=>{
                    var content = "";
                    queryTweet.forEach(tweetDoc=>{
                        let tweets = tweetDoc.data().tweet;
                        const userId = tweetDoc.data().userId;
                        console.log(tweets);
                        content+=`<div>${tweets}</div>`
                })
                $("#tweetContainer").append(content)
            })
        })
    })

        document.getElementById("out").onclick = function() {
            firebase.auth().signOut().then(() =>{
                window.location.href = "/signin.html"
            }).catch((error) =>{
                console.error(error);
            })
        }
    }
    else{
        window.location.href = "/signin.html"
    }
})



