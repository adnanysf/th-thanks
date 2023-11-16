const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  postCount: {
    type: Number,
    default: 0
  },
  usersLeft:{
    type: Array,
    default: ['Ekdev', 'Abhishek', 'Li', 'Ayo', 'Anish','Kirthi','Ashrita','Jaden'
    ,'Malavi','Arya','Jiyoon','Mateo','Anjali','Keegan','Big Harsh','Naveen',
    'Gabe','Nafi','Lizzy','Joshua','Adnan','Austin','Rita','Adam','Lil Harsh','Nico'
    ]
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;