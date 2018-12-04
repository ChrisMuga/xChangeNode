const Sequelize = require('sequelize');
// instantiate database
const sequelize = new Sequelize('x-change', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    },

});



//connection to database
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});


//define user model
const User = sequelize.define('user', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email_address: Sequelize.STRING,
  });

var user_data;
exports.find=function (req, res, next){

    User.findByPk('5023')
    .then(
            users =>    {
                            user_data = users.dataValues;
                            res.send(user_data);
                        }
         );

}


