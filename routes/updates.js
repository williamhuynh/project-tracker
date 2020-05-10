const router = require('express').Router();
let Update = require('../models/update.model');

router.route('/').get((req, res) => {
    Update.find()
        .then(updates => res.json(updates))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:projectid').get((req,res) => {
    Update.find({'projectid': req.params.projectid})
        .then(updates => res.json(updates))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/last/:projectid').get((req,res) => {
    Update.find({'projectid': req.params.projectid}).sort({'createdAt' : -1}).limit(1)
        .then(updates => res.json(updates))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/new').post((req, res) => {
    
    const projectid = req.body.projectid
    const update = req.body.update;
        
    const newUpdate = new Update({
        projectid,
        update,
    });

    newUpdate.save()
        .then(() => res.json('Added new update to project'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;