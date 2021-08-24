const express = require('express');

const router = express.Router();
//import signUp function from controllers folder
const employeeController = require('../controllers/employeeController')

// signup/add employee route
router.post('/signup', employeeController.signUp);

// sign-in route
// router.post('/signin', employeeController.signIn);

//get all employees route
router.get('/', employeeController.getAllEmployees);

//update employee details
router.put('/update/:id', employeeController.updateInfo);

// delete an employee details
router.delete('/delete/:id', employeeController.deleteEmployee);

//get a single employee route
router.get('/:id', employeeController.getSingleEmployee);



module.exports = router;