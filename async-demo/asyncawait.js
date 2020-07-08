console.log('Before');
async function displayCommits() {
    try { // try/catch is used for error handling
        const user = await getUser(1);
        const repos = await getRepositories(user.userName);
        const commits = await getCommits(repos[1]);
        console.log(commits);
    } catch (error) {
        console.log('Error', error.message);
    }
}
displayCommits();

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
