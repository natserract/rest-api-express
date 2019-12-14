
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    //validation
    question: {
        subject: [String],
        detail: [],
        _id: String,
        package: String,
    }
});

//Create the model
const question = mongoose.model('Question', questionSchema)
module.exports = question