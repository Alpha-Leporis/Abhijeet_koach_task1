const User = require("../models/user");

/**
* @author Abhijeet Rathore
**/

exports.registration = (req,res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'User Already Registered'
        });

        // destructuring body
        const { email, password, mobileNO } = req.body;

        const _user = new User({
            email,
            password,
            mobileNO
        });

        _user.save((error, data)=> {
            if(error){
                return res.status(400).json({
                    message : "Somthing Went Wrong...!"
                });
            }

            if(data){
                return res.status(200).json({
                    message: 'User Created Successfully...!'
                }); 
            }
        });
           
    });
}

exports.login = (req,res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error){
            return res.status(400).json({ error });
        }

        if(user){
            if(user.authenticate(req.body.password)){
                const { email, mobileNO} = user;
                res.status(200).json({
                    user: {email, mobileNO}
                });
            }else{
                return res.status(400).json({
                    message : 'Invalid Password'
                });
            }
        }else{
            return res.status(400).json({ message: 'Something Went Wrong...!'});
        }
    });
}

exports.profile = ((req,res) => {
    res.status(200).json({ user: 'profile'});
});