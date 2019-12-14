
const router = require('express').Router();
let Question = require('../models/test.model');

//view/get question datas id
router.route('/:id').get((req, res) => {
    Question.findById(req.params.id)
        .then(question => res.json(question))
        .catch(err => res.status(400).json('Error' + err));
})

//post request
router.route('/add').post((req, res) => {
    const quest = req.body.question;
    const newQuestion = new Question({ quest });

    //method for save data to db
    newQuestion.save()
        .then(() => res.json('Question Added!'))
        .catch(err => res.status(400).json('Error' + err));
});