const router = require('express').Router();
const { Post } = require('../../models');

//new post using the form input from the template file
router.post('/', (req, res) => {
    Post.create({
        title: req.body.post_title,
        description: req.body.post_desc,
        //user id in session
        user_id: req.session.user_id,
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//delete the users comment
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No post with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Edit the users post
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            description: req.body.description,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;