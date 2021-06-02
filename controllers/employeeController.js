const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const People = mongoose.model('People');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert People"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var people = new People();
    people.fullname = req.body.fullname;
    people.email = req.body.email;
    people.phone = req.body.phone;
    people.city = req.body.city;
    people.save((err, doc) => {
        if (!err)
            res.redirect('users/list');
        else
            console.log('Error during record insertion : ' + err);

    });
}

function updateRecord(req, res) {
    People.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('users/list');
        }
        else
            console.log('Error during record update : ' + err);

    });
}


router.get('/list', (req, res) => {
    People.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving people list :' + err);
        }
    });
});


router.get('/:id', (req, res) => {
    People.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update People",
                people: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    People.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/users/list');
        }
        else { console.log('Error in people delete :' + err); }
    });
});

module.exports = router;