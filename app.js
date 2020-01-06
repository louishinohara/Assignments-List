
db.collection("cafes").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data())     // Gets the data from firestore
    })

})          // Asynchornous -> Takes time to do