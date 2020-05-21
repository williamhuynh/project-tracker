const router = require('express').Router();
let Project = require('../models/project.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const progresspercent = req.body.progresspercent;

    const newProject = new Project({
        username,
        name,
        description,
        category,
        progresspercent,
    });

    newProject.save()
        .then(() => res.json('Project added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(project => res.json("Project deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req,res) => {
    Project.findById(req.params.id)
        .then(project => {
            project.username = req.body.username;
            project.name = req.body.name;
            project.description = req.body.description;
            project.category = req.body.category;
            project.progresspercent = req.body.progresspercent;
            
            project.save()
                .then(response => res.json(response))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;