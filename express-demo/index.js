const startupDebugger = require('debug')('app:startup'); // for debug. The namespace can be used as value for DEBUG environment variable to enable debug messages.
const dbDebugger = require('debug')('app:db'); // for debug messages of database layer
const config = require('config'); // for coniguration based on environment
const Joi = require('joi'); // for fluent validation
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

app.get('/', (req, res) => {
    res.render('index', { title: "My demo app", message: "App to learn node" }); // to return web pages
});

const courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' }
]

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));

    if (!course) {
        return res.status(404).send("The course with given id was not found");
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        return res.status(400).send(result.error);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));

    if (!course) {
        return res.status(404).send("The course with given id was not found");
    }

    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        return res.status(400).send(result.error);
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));

    if (!course) {
        return res.status(404).send("The course with given id was not found");
    }

    const index = courses.indexOf(course);
    courses.splice(index);

    return course;
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params.year);
    // year and month are route parameters
    // to access query string parameters(which are optional), use res.query
});

const port = process.env.PORT || 3000; // you can set environment variable in mac using export(or set in windows) in terminal
app.listen(3000, () => {
    console.log('Listening on port 3000...');
});