const presolve = Promise.resolve({ id: 1 }); // promise which is already resolved. Can be used for unit test purpose.
const preject = Promise.reject(new Error('Reason for rejection')); // promise which is already rejected. Can be used for unit test purpose.
preject.catch(err => console.log(err.message));

// Promises in parallel
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
});

Promise // if any of the promise is rejected then the final promise is also rejected
    //.all([p1, p2]) // waits for all promises to complete to trigger it
    .race([p1, p2]) // waits for atleast one of promise to complete to trigger it
    .then(result => console.log(result));