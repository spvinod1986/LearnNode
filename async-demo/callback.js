console.log('Before');
const user = getUser(1); // this will not work. user will be undefined.
console.log(user);
getUserWithCallback(1, (user) => {
    console.log(user);

    // get the repos for the user
    getRepositories(user.userName, (repos) => {
        console.log(repos);

        // something to do with repos will lead to nested structure and to CALLBACK HELL or CHRISTMAS TREE problem!!!
        // A simple solution for this is to use NAMED FUNCTIONS
        getCommits(repos[1], displayCommits); // You can do the same for other call backs in the top tree.
    });
});
console.log('After');


function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from database');
        return { id: id, userName: 'User' }
    }, 2000);
}

// Callback
function getUserWithCallback(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from database for Callback example');
        callback({ id: id, userName: 'User using Callback' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Getting user repository details from Github API for Callback example');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('Getting user commit details from Github API for Callback example');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}

// Named function
function displayCommits(commits) {
    console.log(commits);
}