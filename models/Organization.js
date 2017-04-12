var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrganizationSchema = {

  name: { // need validation: Assignment  7
    type: String,
    default: '',
    trim: true,
    required: 'Name required'
  },
  
  user_name: {  
    type: String, 
    required: 'need unique user_name'
  },

  password:{
    type: String, 
    required: 'need password'
  },

  email: {  // need validation: Assignment 7
    //type: Schema.ObjectId,
    type: String,
    default:'',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },

  location: { // use google map: someday!!!
    type: String, 
    default: 'City, State, Country',
    /*trim: true,*/
    required: 'Enter only City and Country if convenient'
  },

  phone:{
    
  },
  about: { // make organizations share their definite goals on working with the refugeee camp
    type: String,
    default: 'Share Your Philosophy',
  },
  
}

var Organization = mongoose.model('Organization', OrganizationSchema, 'organizations');
module.exports = Organization;
