// Make sure to use a direct relative path to your db.js file
const pool = require('../db');

// Add a verification check to debug the connection
console.log('Pool connection:', pool ? 'Connected' : 'Not connected');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    // Verify pool exists before trying to use it
    if (!pool) {
      throw new Error('Database connection pool is not initialized');
    }
    
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  
  // Validate input
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [title, description || '']
    );
    
    // Get the newly created task
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark a task as completed
const completeTask = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'UPDATE tasks SET is_completed = TRUE WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Get the updated task
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error completing task:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM tasks WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  completeTask,
  deleteTask
};