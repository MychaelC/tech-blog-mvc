const router = require('express').Router();
const { User } = require('../../models');

//new user using the form input values from example 
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.session.user_id,
    })
        .then((dbUserData) => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData)
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//users can log in 
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        //if no user exists there is no user and return error
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that email address' });
                return;
            }
            //check for valid password
            const validPassword = dbUserData.checkPassword(req.body.password);
            //not valid? throw error
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password, please try again' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.logged_in = true;
                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        });
});

// logout and return user to main page
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Remove the session variables
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
    });

module.exports = router;