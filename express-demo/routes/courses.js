const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' }
]

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));

    if (!course) {
        return res.status(404).send("The course with given id was not found");
    }
    res.send(course);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));

    if (!course) {
        return res.status(404).send("The course with given id was not found");
    }

    const index = courses.indexOf(course);
    courses.splice(index);

    return course;
});


module.exports = router;