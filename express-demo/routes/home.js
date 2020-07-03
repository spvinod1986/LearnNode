const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: "My demo app", message: "App to learn node" }); // to return web pages
});

module.exports = router;