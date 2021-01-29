const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>');
//     process.exit(1)
// }
//
// const password = process.argv[2];

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    });

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: 3 },
    number: { type: String, required: true, minlength: 5 },
});

personSchema.plugin(uniqueValidator);

const Person = mongoose.model('Person', personSchema);


personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);
