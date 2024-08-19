const express = require('express');
const router = express.Router();
const { createTask, countTasks, findTask, taskByProduct, searchTask, displayTask, deleteTask, taskCategory, updateTask } = require("../controllers/taskController")
const { isAuthenticated, isAdmin } = require("../middleware/auth");


router.post('/task/create/:id', isAuthenticated, createTask);
router.get('/task/find/:id', findTask);
router.get('/task/byProduct/:id', taskByProduct);
router.get('/task/search/:id', searchTask);
router.get('/task/all', displayTask);
router.get('/task/countTasks', countTasks);
router.delete('/task/delete/:id', deleteTask);
router.put('/task/update/:id', updateTask);
router.get('/task/categories', taskCategory);





module.exports = router;