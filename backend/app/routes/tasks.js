/*
 * Task CRUD routes. All routes are mounted behind the authentication
 * middleware in app/index.js.
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/taskModel');

const notFound = (res) => res.status(404).send('Task not found');

function validTaskId(id) {
  return mongoose.isValidObjectId(id);
}

/** Read one task, but only if it belongs to the signed-in user. */
router.get('/:id', async (req, res) => {
  try {
    if (!validTaskId(req.params.id)) return notFound(res);

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) return notFound(res);
    return res.status(200).json(task);
  } catch (err) {
    console.error('Get task failed:', err);
    return res.status(500).send('Something went wrong.');
  }
});

/** Create a task for the signed-in user. */
router.post('/', async (req, res) => {
  try {
    const { text, date, done = false } = req.body || {};

    if (typeof text !== 'string' || !text.trim() ||
        typeof date !== 'string' || !date.trim()) {
      return res.status(400).send('Missing or invalid required field(s): text, date');
    }
    if (typeof done !== 'boolean') {
      return res.status(400).send('Invalid field: done must be a boolean');
    }

    const task = new Task({
      userId: req.user.id,
      text: text.trim(),
      done,
      date: date.trim()
    });

    const result = await task.save();
    return res.status(201).json(result);
  } catch (err) {
    console.error('Create task failed:', err);
    return res.status(500).send('Something went wrong.');
  }
});

/** Read all tasks belonging to the signed-in user. */
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    return res.status(200).json(tasks);
  } catch (err) {
    console.error('List tasks failed:', err);
    return res.status(500).send('Something went wrong.');
  }
});

/** Partially update a task owned by the signed-in user. */
router.put('/:id', async (req, res) => {
  try {
    if (!validTaskId(req.params.id)) return notFound(res);

    const { text, date, done } = req.body || {};
    const hasText = typeof text !== 'undefined';
    const hasDate = typeof date !== 'undefined';
    const hasDone = typeof done !== 'undefined';

    if (!hasText && !hasDate && !hasDone) {
      return res.status(400).send('No task fields provided for update');
    }
    if (hasText && (typeof text !== 'string' || !text.trim())) {
      return res.status(400).send('Invalid field: text must be a non-empty string');
    }
    if (hasDate && (typeof date !== 'string' || !date.trim())) {
      return res.status(400).send('Invalid field: date must be a non-empty string');
    }
    if (hasDone && typeof done !== 'boolean') {
      return res.status(400).send('Invalid field: done must be a boolean');
    }

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!task) return notFound(res);

    if (hasText) task.text = text.trim();
    if (hasDate) task.date = date.trim();
    if (hasDone) task.done = done;

    const result = await task.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error('Update task failed:', err);
    return res.status(500).send('Something went wrong.');
  }
});

/** Delete a task only when it belongs to the signed-in user. */
router.delete('/:id', async (req, res) => {
  try {
    if (!validTaskId(req.params.id)) return notFound(res);

    const result = await Task.deleteOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (result.deletedCount === 0) return notFound(res);
    return res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Delete task failed:', err);
    return res.status(500).send('Something went wrong.');
  }
});

module.exports = router;
