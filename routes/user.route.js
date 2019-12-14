

/* 
      Notes: 
      - Router() : middleware for specific routes
      - req.body... -like $_POST[field$id] in php - for method post 
      - req.body berfungsi untuk menangkap nilai yang dikirimkan melalui form-html (interface)
      - req: user request/access && res: hasil yg dikirimkan oleh user
      - req.params => params here :id (req.params.id)
      - save() - method for save data to db
  */


const router = require('express').Router();
let User = require('../models/user.model');

//get request 
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err))
})

//post request
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({
        username
    });

    //method for save data to db
    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json('Error' + err));
});

//view/get user datas id
router.route('/:id').get((req, res) => {
    User.find(req.params.id)
        .populate({
            path: 'question',
            populate: {
                path: '_id'
            }
        })
        .exec(function(err, docs) {res.json(docs)});
})


//delete user by id
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json("Error" + err))
});


//update user by id
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json("User updated"))
                .catch(err => console.log("Update user error" + err));
        })
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;

