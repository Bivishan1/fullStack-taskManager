const { Router } = require('express');
const {
  getAllTasks,
  createTask,
  completeTask,
  deleteTask,
} = require('../controllers/taskController');

const router = Router();

// GET all tasks
router.get('/', getAllTasks);

// POST new task
router.post('/', createTask);

// PUT mark task as completed
router.put('/:id/complete', completeTask);

// DELETE task
router.delete('/:id', deleteTask);

// export default router;
module.exports = router;