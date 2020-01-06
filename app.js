const cafeList = document.querySelector('#cafe-list');        // Reference to form 

const form = document.querySelector('#add-cafe-form');

// create element and render cafe

function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    // Creating what is about to be shown
    li.setAttribute('data-id', doc.id);             // Gets the document from the collection
    name.textContent = doc.data().name;             // Get property 'name' within each doc
    city.textContent = doc.data().city;             // Get propertt 'city' within each doc
    cross.textContent = 'x';

    // Displays the element
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // Deleting Data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })

}

// Getting the data from firebase
// db.collection("cafes").orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })

// })          // Asynchornous -> Takes time to do


// Saving Data into firestore

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({                // Adding values from the form into the collections as doc
        name: form.name.value,
        city: form.city.value
    })

    // Clear out fields on the form
    form.name.value = ''
    form.city.value = ''
})

// Realtime listener

db.collection('cafes').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })

})