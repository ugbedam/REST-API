const mongoose = require('mongoose');

//schema for creating the model
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 16,
    max: 26,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`
    },
    required: true
  },
  department: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    reuired: true,
    immutable: true,
    default: () => new Date().toISOString()
  }
});

//creating the model/collection for the Employee Schema
module.exports = mongoose.model('Employee', EmployeeSchema);
