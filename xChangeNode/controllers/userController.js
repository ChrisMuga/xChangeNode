db=require('./databaseController');
var bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
// instantiate database
const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
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
 const User =sequelize.define('user', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email_address: Sequelize.STRING,
    password: Sequelize.STRING
  });


userController=module.exports={

 
    // index
    index: function (req, res, next)
    {
       
        res.render('index', { 
            title: 'X-Change',
           
        });
    },

    //find
    find: function(req, res,next)
    {
        //db.find(req, res)

    },

    //register

    register: function(req, res, next)
    {
        var id = Math.floor((Math.random() * 10000) + 10);
       
        User.create({
             
            id:             id,
            first_name:     req.body.first_name,
            last_name:      req.body.last_name,
            email_address:  req.body.email_address,
            password:       req.body.password,

          }).then(function (){
              data={
                    id: req.body.id,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email_address: req.body.email_address,
              }
              response={
                  code: 0,
                  msg: 'Registration Successful',
                  data: data
              }
              res.send(response);
            }).catch(function (e)
            {
              //console.log(e.errors)
              //console.log('fields:');
              //console.log(e.fields);
              //console.log('=====');
              //console.log(e.parent);
              //console.log('=====');
              //console.log('code: '+e.parent.code);
              //console.log('=====');
              //console.log('msg: '+e.parent.detail);
              //console.log('=====');
              //console.log('severity: '+e.parent.severity);
  
              response = {
                    fields: e.fields,
                    code: e.parent.code,
                    msg: e.parent.detail,
                    severity: e.parent.severity 
                }
  
                console.log(response);
                res.send(response);
  
              
              
                
  
            });
        
          
    },

    fetchAll:function()
    {

    },

    fetch:function(){

    },

    hash:function(){
        xhash=null;
        bcrypt.hash("bacon", null, null, function(err, hash) {
            // Store hash in your password DB
            console.log(hash);
            xhash=hash;
            console.log(xhash);
        });

        // Load hash from your password DB.
        bcrypt.compare("bacon", xhash, function(err, res) 
        {
            // res == true
            console.log(true);
        });
    }



}