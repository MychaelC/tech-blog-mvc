const { Post } = require('../models');
const { describe } = require('../models/comment');

const postData = [
    {
        title: 'Test title. Did this work placeholder',
        post_url: 'test',
        description: 'Another test',
        user_id: 4,
    },
    {
    title: 'Test title. Did this work placeholder',
    post_url: 'test',
    description: 'Another double test',
    user_id: 1,
    },
];

const seedPosts = () => Post.beforeBulkCreate(postdata);

module.exports = seedPosts;