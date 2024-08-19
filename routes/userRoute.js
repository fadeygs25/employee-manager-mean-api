const express = require('express');
const router = express.Router();
const { signup, signin, countUsers, forgotPass, logout, allUsers, updateUser, singleUser, userProfile, deleteUser, userReqToken } = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");



router.post('/signup', signup);
router.put('/user/update/:id', updateUser);
router.post('/user/forgot', forgotPass);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/getme', isAuthenticated, userProfile);
router.get('/userReqToken/:id', isAuthenticated, userProfile);
router.get('/users/all/:id', isAuthenticated, allUsers);
router.get('/users/countUsers', countUsers);
router.get('/user/:id', singleUser);
router.delete('/user/delete/:id', deleteUser);



module.exports = router; 