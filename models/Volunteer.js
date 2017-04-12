var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VolunteerSchema = {
  
  name: { // need validation: Assignment  7
    type: String,
    default: '',
    trim: true,
    required: 'Name required'
  },
  
  email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email required'
  },

  user_name: {  // aesthetic property
    // ki hobe 
    type: String,
    match: ['/^[a-zA-Z0-9]+$/'],
    unique: 'Username already exists',
    required: 'Please type a unique username' 
  },

  
  date_of_birth: {
    type: Date, 
    default: Date.now(), 
  },

  country: { // use google map: someday!!!
    type: String, 
    default: 'Bangladesh',
    trim: true,
    required: ''
  },
  
  emergency_contact: {
    type: String,
    default: 'Person to contact upon emergency',
    trim: true, 
    required: ''
  },
  
  
  emergency_contact_relation: {
    type: String,
    default: 'Father/Mother',
    trim: true, 
    required: ''
  },
  
  emergency_contact_email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email required'
  },
  
  emergency_contact_phone:{
    type: String, 
    required: 'Phone number required',
    //match:  // get validation 
  }
  
}

var Volunteer = mongoose.model('Volunteer', VolunteerSchema, 'volunteers');
module.exports = Volunteer;
