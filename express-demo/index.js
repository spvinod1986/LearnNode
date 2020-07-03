const startupDebugger = require('debug')('app:startup'); // for debug. The namespace can be used as value for DEBUG environment variable to enable debug messages.
const dbDebugger = require('debug')('app:db'); // for debug messages of database layer
const config = require('config'); // for coniguration based on environment
const Joi = require('joi'); // for fluent validation
const courses = require('./routes/courses'); // for loading our courses api module
const home = require('./routes/home'); // for loading home web app module
const express = require('express');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // to get current environment(DEV, QA, undefined(if not set)etc)
console.log(`app: ${app.get('env')}`); // this also get environment. But this returns development if not set

// Configuration property can be read like this
console.log('Application Name : ' + config.get('name'));
console.log('DbServer Name : ' + config.get('dbserver.connection'));

app.set('view engine', 'pug'); // templating engine. For returning web pages instead of json.
app.set('views', './views'); // default. this is optional and required only if web pages/html is in different folder than default.

app.use(express.json()); // adding middleware, app.use will use this middleware in request processing pipeline.
// this middleware is used to read the json object in body of request.

// this debug will work only if the namespace is set for DEBUG environment variable
startupDebugger("Test debug message...");

app.use(function (req, res, next) { // another middleware
    console.log('middleware 1..');
    next();
});

app.use(express.urlencoded({ extended: true })); // middle ware to convert url encoded values to body
app.use(express.static('public')); // path to serve static files like css, images etc

app.use('/api/courses', courses); // setting the path for courses module
app.use('/', home); // setting the path for home module

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params.year);
    // year and month are route parameters
    // to access query string parameters(which are optional), use res.query
});

const port = process.env.PORT || 3000; // you can set environment variable in mac using export(or set in windows) in terminal
app.listen(3000, () => {
    console.log('Listening on port 3000...');
});