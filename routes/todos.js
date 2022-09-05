const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateToDoInput = require("../validation/toDoValidation");

// @route       GET /api/todos/test
// @desc        Test the todos route
// @access      Public
router.get("/test", (req, res) => {
  res.send("ToDo's route working");
});

// @route       POST /api/todos/new
// @desc        Create new todo
// @access      Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validateToDoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Create new todo
    const newToDo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });

    // Save to the database
    await newToDo.save();

    return res.status(201).json(newToDo);
  } catch (error) {
    console.log(error);

    return res.status(500).send(error.message);
  }
});

// @route       GET /api/todos/current
// @desc        Return current users todos
// @access      Private
router.get("/current", requiresAuth, async (req, res) => {
  try {
    const completeToDos = await ToDo.find({
      user: req.user._id,
      complete: true,
    }).sort({ completedAt: -1 });

    const incompleteTodos = await ToDo.find({
      user: req.user._id,
      complete: false,
    }).sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ incomplete: incompleteTodos, complete: completeToDos });
  } catch (error) {
    console.log(error);

    return res.status(500).send(error.message);
  }
});

module.exports = router;
