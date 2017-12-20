var asyncAdd = (a,b) => {
  return new Promise ((resolve,reject)=> {
    setTimeout(()=>{
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a+b);
      } else {
        reject('Arguments must be numbers');
      }
    },1500);
  })
};

asyncAdd(2,'9').then((res)=>{
  console.log('Result: ', res);
  return asyncAdd(res,'3');
}).then((res)=>{
  console.log('Chain Result: ', res);
}).catch((errorRes)=>{
  console.log(errorRes)
})

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(()=>{
//     resolve('Hey, it worked!');
//     // reject('Sorry, sorry');
//   },2500)
// });
//
// somePromise.then((message)=> {
//   console.log('Success: ', message);
// }, (errorMessage)=>{
//   console.log('Error: ', errorMessage);
// });
