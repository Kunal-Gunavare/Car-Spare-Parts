const express = require('express');
const {loginController, updateUserController, userDeleteController, forgetPassword, requestPasswordReset, resetPassword, registerController, getUserProfile, verifyToken } = require('../controllers/usercontroller');

const router = express.Router();

// Routes for User Operations
router.post('/register', registerController);
router.post('/login', loginController);
router.put('/update/:id', updateUserController);  // Update user details by ID
router.delete('/delete/:id', userDeleteController); // Delete a user by ID
router.post('/forget-password', forgetPassword);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.get("/UserProfile", getUserProfile);


module.exports = router;