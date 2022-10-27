const { User } = require('../models');

const userdata = [
    {
        "name": "Paul",
        "email": "paul@hotmail.com",
        "password": "password12345"
      },
      {
        "name": "Johnny",
        "email": "Johnnyo@gmail.com",
        "password": "password12345"
      },
      {
        "name": "Mike",
        "email": "mike@testemail.com",
        "password": "password12345"
      },
      {
        "name": "Sara",
        "email": "Sara@saramail.com",
        "password": "password12345"
      },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;