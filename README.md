# Node
- A runtime envrionment for executing JavaScript code.
- Often used to build backend services like API's.
- Superfast, Good for highly scalable, data-intensive and real-time apps.
- Great for prototyping and agile development.
- Javascript everywhere. Cleaner and more consistent code base.
- Large ecosystem of open source libraries.
- Every browser has JavaScript engine which takes in Javascript code and converts it in to Machine code.
- Google's open source V8 engine is the fastest Javascript engine. The founder of node took the V8 engine and put it in C++ program which is called Node.
- The environment objects in Node(eg: filesystem , request objects) is different from environment objects in browsers (eg: document object).
- Node and Chrome share same JavaScript engine but they have different run time environments for JavaScript.
- Node is not a frameworks. It is a runtime environment for executing Javascript code.
- Node is highly scalable because of Non-blocking Asynchronous nature of Node. Node applications are asynchronous by default.
- In other frameworks each request will be allocated a thread (main thread) and the thread will take care of the request. Node is single threaded where one thread takes care of all request. It does this using event queue internally. When a request is waiting for response from the database, the thread will start processing other waiting request and node will continue to monitor event queue and when the database response is back then the thread will resume the operation. Hence Node is ideal for Data or I/O-intensive apps. But Node is not ideal for CPU-intensive apps.

## Node Module System
- Every file in node is considered a module. The variables and functions declared in a file or module are scoped to that file/module. If you want to access it outside the module, then it should be explicitly exported using export. And then imported in another file using require.
- How it works? - Node wraps code in every file in to a Immediately invoked function [function(exports,require, module, __filename, __dirname{ contents of file} )]. This function is called Module Wrapper Function.
- Node has lot of usefule built in modules like Path, Http, QueryStrings, streams etc. You can find the modules in node.js website API documentation.
- Lot of Node's base functionality is based on the concept of events. An event is a signal that something has happened. Several classes in Node raise different type of events and our code should respond to those events.

## Node Package Manager
- Command line tool and registry of third party libraries we can add to Node application.
- npmjs.com is the home page of registry. Installing node will install npm. But node and npm are developed independently.
- All node applications have package.json file to keep track of installed packages. You can create one using npm init or npm init --yes. Before adding any package to your application, you should create package.json file.
- You can install package using npm i command. This will download the package and adds package details in package.json and exact version and details in package.lock json. Also downloads the package in node_modules folder.
- Earlier versions of npm, downloaded dependencies of a package within the node_modules folder inside package folder which is inside node_modules folder of the app. This created issues because OS like windows have restrictions in path and this created lot of nested structure and duplicate packages.
- Current version of npm, downloads all dependencies as well in node_modules folder. But you can still maintain different versions. Say package A has dependency on B 1.1 and you already use B2.0 in your app. Then B2.0 will be downloaded in node_modules folder and version B1.1 will be downloaded locally in node_modules of package A.
- The size of node_modules folder will grow significantly. So this should be ignored when checking in your code in code repository. The dependencies information are already stored in package.json file.
- Version:"^4.13.5" (with caret) or Version:"~4.13.5" (with tilda) or Version: "4.x" means npm can download latest patch and minor features for version 4.
- npm list should give the list of all dependencies and their dependencies. To view the dependecies of only your app npm list --deoth=0
- npm view packagename will give details of package.json file of the package which will help the developer to go through dependencies and version before installing it.npm view packagename dependencies will give details of only dependencies.npm view packagename version should give all versions of package.
- npm outdated gives the list of outdated projects in your application. npm update will update the packages to wanted version. Latest is different from wanted. Wanted version is the minor and patch incremented version as per the dependency version specification(~ or ^) in package.json. npm-check-updates tool can be used to upgrade packages to latest version. ncu -u will upgrade all packages in your project to its latest version in the package.json. Once package.json is updated, then you can use npm to update to latest.
- Dev Dependencies: Dependencies for development work, for example - unit tests, jshint, bundling, etc and is not used in production environment.npm i packagename --save-dev puts the dependency as dev dependency in package.json.
- npm uninstall packagename will uninstall the package.
- npm, ng are global tools or packages. npm i -g packagename will install the package globally.
- Publishing a package to npm: Create an account in npm using npm user command. Once done , login using npm login command.npm publish will publish the package. Make sure your package name is unique else the publish will fail. To update a published package, you should make sure to update the version number in package.json. You can also use the command npm version major or minor or patch to update the versions numbers.

## Asynchronous JavaScript
- Node run time is single threaded. when you call async function, this function will schedule a task to be performed in future. In the future, the task will call the function configured as an argument. It does not wait as well as it does not block. Async does not mean concurrent or multi threaded.
- Three patterns to deal with async. 1) Callback, 2) Promises and 3) Async/Await.
- Callback: When you call a async function, you will provide a call back function to be called by async function when it completes its operation. If you have tree of dependent operations then it can lead to Callback Hell or Christmas Tree problem. For example - you need to get username from DB(func 1) to query an API for user repos(func 2)and then call an API with repo details to get commit details(func 3) and so on. This leads to code readability issues. Named function is one solution for that problem.
- Promise: A promise is an object that holds the eventual result of an asynchronous operation. The promise will be in either of 3 states. When we initially create promise object it will be in "Pending" state during which it kicks of async operation and it moves to "Fulfilled" state if the operation completes successfully. If something went wrong then the promise will be in "Rejected" state.
- Using async and await, you can write async code that looks like sync code. You can await any function that returns Promise object. await can be used only in an async function. The syntax for async and await is similar to C# programming language.
