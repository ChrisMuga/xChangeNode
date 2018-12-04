//connect to DBase
db = require('./databaseController');

userController=module.exports={

    // index
    index: function (req, res, next)
    {
       
        res.send('Hello Worldo?');
    },

    //find
    find: function(req, res,next)
    {
        //db.find(req, res)

    },

    //register

    register: function(req, res, next)
    {
        res.send('Register');
    }

}