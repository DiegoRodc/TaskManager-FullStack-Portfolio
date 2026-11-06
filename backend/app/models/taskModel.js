/*
 * In this module you will create a Mongoose Schema and Model for a task.
 *
 * Details:
 * 
 * The task schema should have the following properties and types
 *   userId: String,
 *   text: String,
 *   done: Boolean,
 *   date: String
 * 
 * In the options for the task schema, the collection name should be 'Tasks'
 * 
 * A model, called 'Task' should be created from the schema.
 * 
 * The module should export the Task model.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;


// TODO: Create a Schema for the task.
// The examples here will get you started: https://mongoosejs.com/docs/api/schema.html#Schema()
const taskSchema = new Schema(
  {
    userId: String,
    text: String,
    done: Boolean,
    date: String
  },
  { collection: 'Tasks' }
);

// TODO: Create a Model from the schema
// The examples here will get you started: https://mongoosejs.com/docs/api/model.html#Model()
const taskModel = mongoose.model('Task', taskSchema); // replace null with a call to the function to create the model

// Export the model
module.exports = taskModel;