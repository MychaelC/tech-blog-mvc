const router = require('express').Router();

//render login page 
router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router;