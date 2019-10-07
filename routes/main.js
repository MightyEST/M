var express = require('express');
var router = express.Router();
let db = require('./../database');


    router.get('/', (req,res) => {
        res.redirect('/article');
    });
module.exports = router;