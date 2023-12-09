const express = require('express'); 
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authenticate = require("../middleware/authenticate");

router.get('/', (req, res)=>{
    res.json(
        {"message": "Welcome to DressStore Application"});
});

// Create a user
router.post('/api/users', authController.registerUser);

// User sign-in
router.post('/auth/signin', authController.signInUser);

// List all users
router.get('/api/users', userController.getAllUsers);

// Fetch a user by ID
router.get('/api/users/:userID', userController.getUserById);

// Update a user by ID
router.put('/api/users/:userID', userController.updateUser);

// Delete a user by ID
router.delete('/api/users/:userID', userController.deleteUser);

// Protected route
router.get('/about', authenticate, authController.protectedRoute);

module.exports = router;