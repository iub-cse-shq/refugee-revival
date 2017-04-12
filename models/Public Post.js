var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PublicPostSchema = {

  _id: {  // incremental: initial 1000
    type: Number,
    default: '',
    trim: true,
    required: 'public post id required'
  },
  /////////
  org:{ // organization that created the post 
    type: String, 
    required: ''
  },
  location:{
    type: String, // country
    required: 'Volunteer Post.js: country of operation required'
  },
  ////////
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

var PublicPost = mongoose.model('PublicPost', PublicPostSchema, 'publicposts');
module.exports = PublicPost;
