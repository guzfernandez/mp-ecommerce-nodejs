var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('home');
});

router.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

router.use('/payments', require('./payments'));

module.exports = router;