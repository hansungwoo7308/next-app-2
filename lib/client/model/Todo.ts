import mongoose from "mongoose";

// make a schema
const todoSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  id: {
    type: Number,
    // required: true,
  },
  title: {
    type: String,
    // required: true,
  },
  completed: {
    type: Boolean,
  },
});

// make a model
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
