const Task = require("../models/taskModel");



exports.createTask = async (req, res, next) => {

    const {
        name,
        description,
        projectId,
        priority,
        status
    } = req.body;
    const userId = req.user.id
    try {
        const task = await Task.create({
            name,
            description,
            projectId,
            userId,
            priority,
            status
        });
        res.status(201).json({
            success: true,
            task
        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.displayTask = async (req, res, next) => {


    try {
        const tasks = await Task.find();
        res.json(tasks)

    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.countTasks = async (req, res, next) => {


    try {
        const countTasks = await Task.countDocuments();
        res.status(200).json({ count: countTasks });


    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.findTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        res.json(task)

    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.taskByProduct = async (req, res, next) => {

    try {
        const task = await Task.find({ projectId: req.params.id });
        res.json(task)

    } catch (error) {
        console.log(error);
        next(error);

    }

}

exports.searchTask = async (req, res, next) => {

    try {
        const tasks = await Task.find({ name: req.params.id });
        console.log(tasks);
        res.status(201).json({
            success: true,
            tasks
        })
    } catch (error) {
        console.log(error);
        next(error);

    }

}

// Update task image in Cloudinary and task data in MongoDB.
exports.updateTask = async (req, res, next) => {
    try {
        const { name, priority, status, description } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            { name, priority, status, description },
            { new: true }
        );
        res.json(task);
    } catch (error) {
        console.log(error);
        next(error);
    }

}



// delete task and task image in cloudinary
exports.deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);
        //retrieve current image ID
        const rmTask = await Task.findByIdAndDelete(req.params.id);

        res.status(201).json({
            success: true,
            message: " task deleted",

        })

    } catch (error) {
        console.log(error);
        next(error);

    }

}





// display category
exports.taskCategory = async (req, res, next) => {

    try {
        const cat = await Task.find().populate('category', 'name').distinct('category');
        res.status(201).json({
            success: true,
            cat
        })

    } catch (error) {
        console.log(error);
        next(error);
    }

}




