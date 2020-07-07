const promise = new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve({
      name: 'Bert',
      age: 23
    });
    //reject('Something wrong');
  }, 6000);
  
});

console.log('before');

promise.then((data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('This is my other promise');
    }, 6000);
    
  });
})
.then((str) => {
  console.log("This is the second log", str);
}).catch((data) => {
  console.log('error: ', data)
});

promise.then((data) => {
  console.log(data);
}, (data) => {
  console.log('error: ', data)
});

console.log('after');