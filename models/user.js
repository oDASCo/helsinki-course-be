const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  name: { type: String, required: true, minlength: 3 },
  passwordHash: String,
  blogs: [
    {
      title: String,
      author: String,
      url: String,
      likes: Number,
      id: String
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
