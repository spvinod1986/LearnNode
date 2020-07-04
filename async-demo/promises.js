const p = new Promise(function (resolve, reject) {
    // Kick off some async work
    setTimeout(() => {
        resolve(1); // resolved, fullfilled
        //reject(new Error('message')); // for sending error if something goes wrong
    }, 2000);
});
p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));

// Fix callback hell problem using promises
console.log('Before');

getUser(1)
    .then(user => getRepositories(user.userName))
    .then(repos => getCommits(repos[1]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from database for Promise example');
            resolve({ id: id, userName: 'User using Callback' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting user repository details from Github API for Promise example');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting user commit details from Github API for Promise example');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}
