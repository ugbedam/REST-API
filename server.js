const express = require('express');
const mongoose = require('mongoose');
const employeesRouter = require('./routes/employees');
const Employee = require('./model/Employees');
const path = require('path');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 4000;

//Set up mongoose connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once(
  'open',
  () => console.log('Connected to Database'),
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
);

//middlewares
app.use(express.json());
app.use('/employees', employeesRouter);

//View engine setup
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

//Get the home page
app.get('/', async (req, res) => {
  const employees = await Employee.find({});
  res.render('index', {
    title: 'REST API',
    employeesList: employees
  });
});
