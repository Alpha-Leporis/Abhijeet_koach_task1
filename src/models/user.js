const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
* @author Abhijeet Rathore
**/

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password:{
        type : String,
        required: true,
    },
    mobileNO : {
        type: String,
        required: true,
        unique: true,
        min : 10,
        max: 10
    },
}, { timestamps: true });

// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.hash_password);
    },
  };


module.exports = mongoose.model('User', userSchema);