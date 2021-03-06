
// Dependencies
 
 const express = require('express');
 const router  = express.Router();
 const Celebrity = require('../models/Celebrity');




// Create Celeb
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => res.render('celebrities/index', { celebrities }))
    .catch(err => next(err));
});

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => res.render('celebrities/show', { celebrity }))
    .catch(err => next(err));
});



// Add

router.get("/celebrities/new", (req, res, next) => {
  res.render("./celebrities/new")
})

 router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({name, occupation, catchPhrase})
  console.log(newCelebrity)
  newCelebrity.save()
    .then(() => {
      res.redirect("/celebrities")
    })
    .catch((error) => {
      console.log("error creating new celebrities" + error)
    })
})





// Delete
router.post("/celebrities/:id/delete",(req, res)=>{
  Celebrity.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.redirect("/celebrities")
  })
  .catch((err)=>{
    console.log("error while deleting celebrity"+err)
  })
})



// Celebrities

router.get("/celebrities/:id/edit", (req, res) => {
  Celebrity.findById(req.params.id)
    .then((celebrities) => {
      res.render("./celebrities/edit", { celebrities })
    })
    .catch((err) => {
      console.log("error while editing" + err)
    })
})
 router.post("/celebrities/:id", (req, res) => {
  const { name, occupation, catchPhrase } = req.body
  Celebrity.update(
    { _id: req.params.id },
    { $set: { name, occupation, catchPhrase } },
    { new: true }
  )
    .then(() => {
      console.log(Celebrity)
      res.redirect("/celebrities/")
    })
    .catch((err) => {
      console.log("error while editing" + err)
    })
})


 module.exports = router;