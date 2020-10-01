// Imports 
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Course , User } = require('./models');

const router = express.Router();

/* User routes */
router.get('/users', asyncHandler(async (req, res) => {

}));

router.post('/users', (req, res) => {
  res.status(201).set('Location', '/').end();
});


const filterOptions = {
  include:[{ 
    model: User, 
    attributes: { 
      exclude: ['password', 'createdAt', 'updatedAt']
    } 
  }],
  attributes: { 
    exclude: ['createdAt', 'updatedAt']
  }
}

/* Courses routes */
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll(filterOptions);
  res.json(courses);
}));

router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, filterOptions );
  course 
    ? res.json(course) 
    : res.status(404).json({message: `Course id: ${req.params.id} not found`});
}));

router.post('/courses', asyncHandler(async (req, res) => {
  const { title , description, userId } = req.body;
  // Getting error "message": "SQLITE_CONSTRAINT: FOREIGN KEY constraint failed"
  const course = await Course.create(req.body);
  res.status(201).set('Location', `/courses/`).end();
}));

router.put('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {

  } else {
    res.status(404).json({message: `Course id: ${req.params.id} not found`});
  }
}));
router.delete('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if (course) {
    await course.destroy();
    res.status(204).end();

  } else {
    res.status(404).json({message: `Course id: ${req.params.id} not found`});
  }
}));


module.exports = router;