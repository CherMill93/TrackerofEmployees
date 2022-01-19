const db = require('./db/connection');

const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const app = express();

// const inputCheck = require('./utils/inputCheck');
// const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3012;


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//inquirer prompts
const promptMessages = {}



// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});