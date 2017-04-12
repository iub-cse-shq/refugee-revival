var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VolunteerCallSchema = {

  _id: {  // incremental: initial 2000
    type: Number,
    default: '',
    //trim: true,
    required: 'volunteer call id required'
  },
  no_of_response:{  // volunteers will response to this 
    type: Number, 
  },
  skills_required:{
    
  },
  status:{  // Active, Expired 
    type: Boolean()
  },
  ////////
  
  org:{ // organization that created the call 
    type: String,   // username 
    required: ''
  },
  location:{
    type: String, // country
    required: 'Volunteer Call.js: country of operation required'
  },

  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Description required'
  },
  body: {
    type: String,
    default: '',
    trim: true,
    required: 'Description required'
  },
}

var VolunteerCall = mongoose.model('VolunteerCall', VolunteerCallSchema, 'volunteercalls');
module.exports = VolunteerCall;