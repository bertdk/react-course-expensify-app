import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJCT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


// gtit test

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {firebase, database as default};

/**** Set data ****/

// database.ref().set({
//   name: 'Bert',
//   age: 23,
//   stressLevel: 5,
//   job: {
//     title: 'Soft Dev',
//     company:'Google'
//   },
//   location: {
//     city: 'Leuven',
//     country: 'BE'
//   }
// }).then(() => {
//   console.log('Data is saved')
// }).catch((e) => {
//   console.log('This failed', e)
// })

// // database.ref().set('this is my string');

// // database.ref('age').set(25);
// // database.ref('location/city').set('Heverlee');

// database.ref('attributes').set({
//   lenget: 199,
//   gewicht: 90
// }).then(() => {
//   console.log('call worked');
// }).catch((e) => {
//   console.log('it was a bad try', e);
// });

/**** Remove data ****/

// database.ref('isSignle').
// remove().then(function() {
//   console.log("Remove succeeded.")
// })
// .catch(function(error) {
//   console.log("Remove failed: " + error.message)
// });

/**** Update data ****/


// database.ref().update({
//   stressLevel: 9,
//   'location/city': 'Seatle',
//   'job/company': 'Amazon'
// });

/**** Read data once ****/

// database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   });

/**** Read data on every change ****/


// const onValueChange = database.ref().on("value", (snapshot) => {
//   console.log(snapshot.val());
// }, (e) => {
//   console.log('Error with data fetching');
// });

// setTimeout(() => {
//   database.ref('age').set(1);
// }, 3500);

// setTimeout(() => {
//   database.ref().off("value", onValueChange);
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(10);
// }, 10500);

// database.ref().on("value", (snapshot) => {
//   console.log(snapshot.val().name, ' is a ', snapshot.val().job.title, ' at ', snapshot.val().job.company);
// });

// setTimeout(()=>{
//   database.ref().update({
//     name: "Koen"
//   });
// }, 2000);

// setTimeout(()=>{
//   database.ref().update({
//     name: "Jef"
//   });
// }, 4000);

/**** Save array ****/

// const note = [{
//   id: 12,
//   title: 'Buyer',
//   body: 'My note'
// },{
//   id: 22,
//   title: 'Seller',
//   body: 'My note too'
// }];

// const fireNotes = {
//   notes: {
//     aaaa: {
//       title: 'Buyer',
//       body: 'My note'
//     },
//     bbbb: {
//       title: 'Seller',
//       body: 'My note too'
//     }
//   }
// };

// database.ref('notes').set(note);

// database.ref('notes').push({
//   title: 'Cousr',
//   body: 'R, Nat'
// })

// expenses.forEach(e => {
//   database.ref('Expenses').push({
//     description: e.description,
//     note: e.note,
//     amount: e.amount,
//     createdAt: e.createdAt
//   });
// });

/**** Read array ****/

// database.ref('Expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((child) => {
//       expenses.push({
//         id: child.key,
//         ...child.val()
//       })
//     });
//     console.log(expenses);
//   });

// database.ref('Expenses')
//   .on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((child) => {
//       expenses.push({
//         id: child.key,
//         ...child.val()
//       })
//     });
//     console.log(expenses);
//   });

// database.ref('Expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('Expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// // Also fires for every data already in the database
// database.ref('Expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });