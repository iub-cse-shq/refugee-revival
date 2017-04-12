var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AdminSchema = {
  
  user_name:{
    
  },
  
  password:{
    
  },

  created: {
    type: Date,
    default: Date.now
  }
}

var Admin = mongoose.model('Admin', AdminSchema, 'admins');
module.exports = Admin;
