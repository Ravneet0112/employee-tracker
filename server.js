const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);
db.connect((err) => {
    main()
})

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

                {
                    name: "Update manager",
                    value: "update_manager"
                },
                {
                    name: "Delete departments",
                    value: "delete_departments"
                },
                {
                    name: "Delete employees",
                    value: "delete_employees"
                },
                {
                    name: "Delete roles",
                    value: "delete_roles"
                },
                {
                    name: "View employees by manager",
                    value: "view_employees_by_manager"
                }
            ]
        }
    ]).then(function (response) {




        switch (response.question) {
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
            case 'update_manager':
                return updateManager();
            case 'delete_departments':
                return deleteDepartment();
            case 'delete_employees':
                return deleteEmployee();
            case 'view_employees_by_manager':
                return viewEmployeesByManager();
            case 'delete_roles':
                return deleteRole();
            default:
                break;
        }
    })
}



function viewEmployees() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.table(results);
        main();
    });
}

function viewDepartments() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        main();
    });
}

function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
        main();
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
            viewEmployees();

        });
        
    });


}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?'
        }
    ]).then(function (answers) {
        db.query(`INSERT INTO department (department_name) VALUES (?)`, [answers.department_name], function (err, results) {
            viewDepartments();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id?'
        },]).then(function (answers) {
            
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.title, answers.salary, answers.department_id], function (err, results) {
                viewRoles();
                }
            );
        });
}

function updateRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee whose role you would like to update?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the id of the new role that you would like to assign to the employee?'
        }]).then (function (answers) {
            db.query(`UPDATE employee SET role_id =? WHERE id =?`, [answers.role_id, answers.id], function (err, results) {
                viewEmployees();
            });
        });
}

function updateManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of employee whose manager you would like to update?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the id of the new manager that you would like to assign to the employee?'
        }]).then (function (answers) {
            db.query(`UPDATE employee SET manager_id =? WHERE id =?`, [answers.manager_id, answers.id], function (err, results) {
                viewEmployees();
            });
        });
}

function deleteDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the department that you would like to delete?'
        }]).then (function (answers) {
            db.query(`DELETE FROM department WHERE id =?`, [answers.id], function (err, results) {
                viewDepartments();
            });
        });
}

function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee you would like to delete?'
        }]).then (function (answers) {
            db.query(`DELETE FROM employee WHERE id =?`, [answers.id], function (err, results) {
                viewEmployees();
            });
        });
}

function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the role you would like to delete?'
        }]).then (function (answers) {
            db.query(`DELETE FROM role WHERE id =?`, [answers.id], function (err, results) {
                viewRoles();
            });
        });
}

function viewEmployeesByManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the manager whose employees you would like to view?'
        }]).then (function (answers) {
            db.query(`SELECT * FROM employee WHERE manager_id =?`, [answers.id], function (err, results) {
                console.table(results);
                main();
            });
        });
}

fu





