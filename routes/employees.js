const express = require('express');
const Employee = require('../model/Employees');
const router = express.Router();
const { isValidObjectId } = require('mongoose');

//create an employee
router.post('/', async (req, res) => {
  //Create and saves the new employee
  // const employee = await Employee.create({
  //   name: req.body.name,
  //   department: req.body.department
  // })

  const employee = new Employee({
    name: req.body.name,
    age: req.body.age,
    department: req.body.department,
    email: req.body.email
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//@Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({})
      .where('department')
      .equals('Sales');
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@Get employee
router.get('/:id', getEmployee, (req, res) => {
  res.status(200).json(res.employee);
});

//@Update employee
router.patch('/:id', getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }

  if (req.body.department != null) {
    res.employee.department = req.body.department;
  }

  if (req.body.age != null) {
    res.employee.age = req.body.age;
  }

  if (req.body.email != null) {
    res.employee.email = req.body.email;
  }

  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//@Delete employee
router.delete('/:id', getEmployee, (req, res) => {
  try {
    res.employee.remove();
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get employee by id middleware function
async function getEmployee(req, res, next) {
  const { id } = req.params;
  let employee;

  if (!isValidObjectId(id)) {
    return res.status(500).json('Invalid Employee Id');
  }

  try {
    employee = await Employee.findById(id);

    if (isValidObjectId(id) && employee == null) {
      return res
        .status(404)
        .json({ message: `Employee with ID ${id} not found.` });
    }
    res.employee = employee;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
