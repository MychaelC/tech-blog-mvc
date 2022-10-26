const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}
//see user.js  in models folder #24
Comment.init(
    {

    }
)