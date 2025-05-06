import { query } from '../db';

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const [rows] = await query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ error: 'Server error' });
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
    const [result] = await query(
      'INSERT INTO tasks (title, description) VALUES (?, ?)',
      [title, description || '']
    );
    
    // Get the newly created task
    const [rows] = await query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
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
    const [result] = await query(
      'UPDATE tasks SET is_completed = TRUE WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Get the updated task
    const [rows] = await query('SELECT * FROM tasks WHERE id = ?', [id]);
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
    const [result] = await query(
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

export default {
  getAllTasks,
  createTask,
  completeTask,
  deleteTask
};