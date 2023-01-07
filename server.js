const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Ravneet@9855655365',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

async function main() {
    const questions = inquirer.prompt([
        {
            type: 'list',
            name: 'question',
            message: 'What would you like to do?',
            choices: [
                {
                    name: "View all employees",
                    value: "view_employees"
                },

                {
                    name: "View all departments",
                    value: "view_departments"
                },

                {
                    name: "View all roles",
                    value: "view_roles"
                },

                {
                    name: "Add a new employee",
                    value: "add_employee"
                },

                {
                    name: "Add a new department",
                    value: "add_department"
                },

                {
                    name: "Add a new role",
                    value: "add_role"
                },

                {
                    name: "Update employees role",
                    value: "update_role"
                },
            ]
        }
    ]);

    switch (questions) {
        case 'view_employees':
            return viewEmployees();
        case 'view_departments':
            return viewDepartments();
        case 'view_roles':
            return viewRoles();
        case 'add_employee':
            return addEmployee();
        case 'add_department':
            return addDepartment();
        case 'add_role':
            return addRole();
        case 'update_role':
            return updateRole();
        default:
            break;
    }
}

function viewEmployees() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.table(results);
    });
}

function viewDepartments() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
    });
}

function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
    });

    
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employees role id?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the employees manager id?'
        }
    ]).then(function (answers) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], function (err, results) {
            console.table(results);
        });
    });
}
