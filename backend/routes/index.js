const express = require('express');
const router = express.Router();
const authController = require('../controllers/UserControllers');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Email verification route
router.get('/verify-email/:token', authController.verifyEmail);

//User details route
router.post('/users', authController.userDetail)

//fetch user details
router.get('/user-details', authController.getUserDetails)

router.delete('/userdelete/:id', authController.deleteUser);

router.put('/useredit/:id', authController.updateUser);

module.exports = router;
