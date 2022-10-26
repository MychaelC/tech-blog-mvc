const router = require('express').Router();
const { Comment } = require('../../models');

//comment upload by the user
router.post('/:id', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        //user id
        user_id: req.session.user_id,
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

//delete the users comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No comment with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Edit the users comment
router.put('/:id', (req, res) => {
    Comment.update(
        {
        comment_text: req.body.comment_text,
    },
{
    where: {
        id: req.params.id,
    },
}
    )
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No comment with this id' });
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