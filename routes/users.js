const express = require('express');
const router = express.Router();

const userModel = require('../db/userModel')

/* GET users in render page. */
router.get('/get', function (req, res) {

  userModel.find().then(function (doc){
    res.status(200).send({userList: doc})
  })
})

router.post('/insert', function (req, res) {
  const item = {
    name: req.body.name,
    email: req.body.email,
    date: Date.now()
  }

  const data = new userModel(item)
  data.save().then(r => {
    res.setHeader('Content-Type', 'application/json')
    if(r.errors){
      res.status(404).send({message: r.errors.name})
    }else{
      res.status(200).send({message: "successfully"})
    }
  }
  )
})

router.post('/update', function(req, res, next) {
  const id = req.body.id;

  userModel.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = req.body.name;
    doc.email = req.body.email;
    doc.date = Date.now();

    doc.save().then(r => {
      res.setHeader('Content-Type', 'application/json')
      if(r.errors){
        res.status(404).send({message: r.errors.name})
      }else{
        res.status(200).send({message: "successfully"})
      }
    })
  })
});


router.post('/delete', function (req, res) {
  const id = req.body.id
  userModel.findByIdAndRemove(id).exec().then(r => {
    res.setHeader('Content-Type', 'application/json')
    if(r.errors){
      res.status(404).send({message: r.errors.name})
    }else{
      res.status(200).send({message: "successfully"})
    }
    }
  );
})



module.exports = router;
