const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// the main handlebars template renders inside the body and we render the homepage handlebars
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'created_at', 'user_id', 'description'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then((dbPostData) => {
            //organize the data somehow
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            //we want newest post first
            posts.reverse();
            //homepage template needs to include the posts obj
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//render post detail
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'created_at', 'user_id', 'description'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            {
                model: User,
                attributes: ['username'],
            }
        ],
    })

        .then((dbPostData) => {
        const title = dbPostData.dataValues.title;
        const user = dbPostData.dataValues.user.username;
        const date = dbPostData.dataValues.created_at;
        const description = dbPostData.dataValues.description;
        const post = {
            title,
            date,
            user,
            description,
            comments: [],
        };

        for (let i = 0; i < dbPostData.dataValues.comments.length; i++) {
            let username = dbPostData.dataValues.comments[i].user.username;
            let comment_text = dbPostData.dataValues.comments[i].comment_text;
            let commentDate = dbPostData.dataValues.comments[i].dataValues.created_at;
            let user_id = dbPostData.dataValues.comments[i].dataValues.user_id;
            let comment_id = dbPostData.dataValues.comments[i].dataValues.id;

            post.comments.push({
                user: username,
                user_id: user_id,
                text: comment_text,
                date: commentDate,
                commentId: comment_id,
                //check comment of each username and return true if matches username
                usersComment: username == req.session.username,
            });
        }

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;