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

        //hash the password 
        password = req.body.password;
        xhash=null;
        bcrypt.hash(password, null, null, function(err, hash) {
            //Store hash in your password DB
            //console.log(hash);

            User.create({
             
                id:             id,
                first_name:     req.body.first_name,
                last_name:      req.body.last_name,
                email_address:  req.body.email_address,
                password:       hash,
    
              }).then(function (){
                  data={
                        id: req.body.id,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email_address: req.body.email_address,
                  }
                  response={
                      code: 1,
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
            //Store hash in your password DB
            console.log(hash);
            xhash=hash;
            console.log(xhash);
        });

        // Load hash from your password DB.
        bcrypt.compare("bacon", xhash, function(err, res) 
        {
            //res == true
            console.log(true);
        });
    },
    //sign-in
    signin: function(req, res, next)
    {
        res.render('signin');
    },
    //user auth
    userAuth:function (req, res, next)
    {
        User.findOne({ where: {email_address: req.body.email_address} }).then(user => {

            //fetch password from body
            password = req.body.password;

            //fetch fields

            var user_data = user.dataValues;
            


            //fetch hashed password
            hashed_password = user_data.password;

            //Load hash from your password DB (and compare)
            bcrypt.compare(password, hashed_password, function(err, resp) 
            {
                //conditional manipulation
                if(resp==true)
                {
                    
                    response = {
                        code: 1,
                        msg: 'Authorized',
                        user_data: user_data
                    }
                    res.send(response);
                }
                else
                {
                    response = {
                        code: 0,
                        msg: 'Not Authorized',
                    }

                    res.send(response);
                }
                //console.log(res);
            });
          })

    },

    // users page

    users: function(req, res, next)
    {
        User.findAll().then(users => {

            console.log(users);
            res.render('users', {users: users});

          })
    },

    // test-upload view
    upload: function(req, res, next)
    {
        res.render('upload')
    },

    uploadImg: function(req, res, next)
    {
        res.send(req.body);
    }

}