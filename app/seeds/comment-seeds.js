const { Model } = require('sequelize');
const { Comment } = require('../models');

const commentdata = [
    {
        comment_text: 'Test comment. Did this work?',
        user_id: 6,
        post_id: 1,
    },
    {
        comment_text: 'Test comment. Did this work?',
        user_id: 6,
        post_id: 8,
    },
    {
        comment_text: 'Test comment. Did this work?',
        user_id: 4,
        post_id: 2,
    },
    {
        comment_text: 'Test comment. Did this work?',
        user_id: 3,
        post_id: 1,
    },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;