INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (department_id, title, salary)
VALUES (1, 'Sales Lead', 100000),
    (1, 'Salesperson', 80000),
    (2, 'Lead Engineer', 150000),
    (2, 'Software Engineer', 120000),
    (3, 'Account Manager', 160000),
    (3, 'Accountant', 125000),
    (4, 'Legal Team Lead', 130000),
    (4, 'Lawyer', 120000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Malia', 'Brown', 5, NULL),
    ('Sarah', 'Lourd', 6, 5),
    ('Tom', 'Allen', 7, NULL),
    ('Jacob', 'Smith', 8, 7);