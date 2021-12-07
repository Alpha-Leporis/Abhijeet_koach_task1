const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.registration = (req,res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'User Already Registered'
        });

        // destructuring  body
        const { firstName, lastName, email, password } = req.body;

        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username : Math.random().toString()
        });
       
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Somthing Went Wrong!'
                });
            }

            if(data){
                return res.status(201).json({
                    user: data
                    // message: 'User created Successfully...!'
                });
            }
            
        });
    });
}

exports.login = (req,res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({ _id: user._id},process.env.JWT_SECRET, { expiresIn:'1h'});
                const { _id, firstName, lastName, email, fullName } = user;
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, fullName }
                });
            }else{
                return res.status(400).json({
                    message : 'Invalid Password'
                });
            }
        }else{
            return res.status(400).json({ message: 'Somthing Went Wrong!'});
        }
    });
}