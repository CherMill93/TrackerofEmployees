const db = require('./db/connection');
const sql = require('mysql2');
const inquirer = require('inquirer');

// const promptDepartment = () => {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'newDepartment',
//       message: 'Type department name:',
//       validate: nameInput => {
//         if (nameInput) {
//           return true;
//         } else {
//           console.log('You need to enter a department name!');
//           return false;
//         }
//       }
//     }
//   ])
//   .then(({
//     newDepartment
//   }) => {addDepartment(newDepartment)});
// }

function addDept() {
  inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'What is the department name?'
  })
      .then(({ name }) => {
          db.promise().query(`INSERT INTO department (name) VALUES ('${name}')`).then(addDept => {
              console.log(`New department Added : ${name}`);
              promptUser();
          })

      })
};

const addRole = async () => {
  //this grabs previously existing department entries
  const getDepts = await db.promise().query(`SELECT name, id as value FROM department`);
    const userInput = await inquirer.prompt([
      {
        type: 'input',
        name: 'job_name',
        message: 'What is the name of this role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'What department is this role is?',
        choices: getDepts[0] //departments that already exist
      }
    ])
    //   .then(({ title }) => {
    //       db.promise().query(`INSERT INTO job (title) VALUES ('${title}')`).then(addRole => {
    //       })
    //       console.log(`New role added : ${title}`)
    //   })
    //   .then(({ salary }) => {
    //     db.promise().query(`INSERT INTO job (salary) VALUES ('${salary}')`).then(addRole => {
    //         console.log(`New salary added : ${salary}`);
    //     })
        
    // })
    const newRole = await db.promise().query(`INSERT INTO job SET ?`, userInput);
    console.log(`Job Role: ${userInput.job_name} added!`);
    promptUser();
};

const addEmployee = async () => {
  //this grabs job title from job table
  const getRoles = await db.promise().query(`SELECT job_name, id as value FROM job`);
  const getEmployees = await db.promise().query(`SELECT concat(first_name, ' ', last_name) as name, id as value FROM employee`);
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: `What is the employee's first name?`
    },
    {
      type: 'input',
      name: 'last_name',
      message: `What is the employee's last name?`
     
    },
    {
      type: 'list',
      name: 'role_id',
      message: `What is the employee's role?`,
      choices: getRoles[0] //roles from job table
    },
    {
      type: 'list',
      name: 'manager_id',
      message: `Who is the employee's manager?`,
      choices: getEmployees[0] //roles from employee table
    }
  ])
    const newEmployee = await db.promise().query(`INSERT INTO employee SET ?`, userInput);
    console.log(`Employee: ${userInput.first_name} added!`);
    promptUser();
};

const updateRole = async () => {
  const getEmployee = await db
  .promise()
  .query(
    `SELECT CONCAT(first_name, " ",last_name) as name, id as value FROM employee`
  );
  const getRole = await db
  .promise()
  .query(`SELECT job_name as name, id as value FROM job`);
  const userData = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Please select as employee whose role you would like to change.",
      choices: getEmployee[0],
    },
    {
      type: "list",
      name: "id",
      message: "Please select the role of the employee.",
      choices: getRole[0],
    },
  ]);
  const assignRole = await 
  db.promise().query(`UPDATE employee SET role_id =? where id=?`, 
  [
    userData.role_id,
    userData.id,
  ]); 

//can't pull employee data - WHAT DO???
}

  // inquirer prompts
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'routine',
      message: 'What would you like to do first:',
      choices: [
        "view all departments",
        "view all roles", 
        "view all employees",
        "add a department",
        "add a role",
        "add an employee", 
        "update an employee role",
        "exit navigation"
      ],
    }
  ]).then( ({ routine }) => {

    if (routine === 'view all departments') 
    { //queries here
      console.log('Wahoo you can view all departments!')
      // app.get('/api/department', (req, res) => {
      //     const sql = `SELECT candidates.*, parties.name 
      //                   AS party_name 
      //                   FROM candidates 
      //                   LEFT JOIN parties 
      //                   ON candidates.party_id = parties.id`;
                        
      //     db.query(sql, (err, rows) => {
      //       if (err) {
      //         res.status(500).json({ error: err.message });
      //         return;
      //       }
      //       res.json({
      //         message: 'success',
      //         data: rows
      //       });
      //     });
        // });
    
    }else if (routine === 'view all roles') 
    {
      db.query(`SELECT * FROM department`)
      console.log('Wahoo you can view all roles!')
      
    }else if (routine === 'view all employees') 
    {console.log('Wahoo view all employees!')} //queries here

    else if (routine === 'add a department') 
      { 
        console.log('Wahoo add a department!')
        addDept()
    }

    else if (routine === 'add a role') 
    {
      console.log('Wahoo add a role!')
      addRole();
    } 
    
   else if (routine === 'add an employee') 
    {
      console.log('Wahoo add an employee!')
      addEmployee();
    }

    else if (routine === 'update an employee role') 
    {
      console.log('Wahoo update an employee role!')
      updateRole();
    }

    else {
      db.end()
      process.exit(0)
    }
    
  });
};




db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  promptUser();
});