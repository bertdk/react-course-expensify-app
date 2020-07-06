//
// Object destruction
//

const person = {
  name: 'Bert',
  age: 23,
  location: {
    city: 'Leuven',
    temp: 98
  }
};

// const name = person.name;
// const age = person.age;
const {name, age} = person;

console.log(`${name} is ${age}`);

// Renaming
const {city, temp: degree} = person.location;
if(city && degree){
  console.log(`It is ${degree} in ${city}`);
}

// + Defaults
const person2 = {
  age2: 23,
  location2: {
    city2: 'Leuven',
    temp2: 98
  }
};

const {name2: firstName = 'anno', age2} = person2;

console.log(`${firstName} is ${age2}`);


const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holliday',
  publischer: {
    // name: 'Penguin'
  }
};

const {name: publischerName = 'self-published'} = book.publischer;

console.log(publischerName);


//
// Array destruction 
//

const address= ['Koekenstaart', 'Leuven', 'Brandbant', '3000'];

const [, stad, state ='NY'] = address;

console.log(`You are in ${stad} ${state}`);

const item = ['Coffee (ho)', '$2.00', '$2.50', '$2.75'];

const [product, , mediumPrice] = item;

console.log(`A medium ${product} costs ${mediumPrice}`)