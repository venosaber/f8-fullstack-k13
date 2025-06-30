-- request 1: create table departments
DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(100)
);

-- request 2: create table employees
DROP TABLE IF EXISTS employees;
CREATE TABLE employees(
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(50),
                          salary DECIMAL(10,2),
                          department_id INT,
                          hire_date DATE,
                          FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- request 3: add column position to table employees
ALTER TABLE employees ADD COLUMN position VARCHAR(50);

-- request 4: rename column salary to monthly_salary
ALTER TABLE employees RENAME COLUMN salary TO monthly_salary;

-- request 5: add 5 records to table departments
INSERT INTO departments(name)
VALUES ('IT'), ('HR'), ('Finance'), ('Sales'), ('Marketing');

-- request 6: add 10 records to table employees for different departments
INSERT INTO employees (name, monthly_salary, department_id, hire_date, position)
VALUES
    ('John Doe', 55000.00, 1, '2021-06-15', 'Software Engineer'),
    ('Jane Smith', 75000.50, 2, '2019-03-23', 'HR Manager'),
    ('Alan Brown', 95000.75, 3, '2020-11-05', 'Accountant'),
    ('Emily Davis', 68000.25, 4, '2022-02-19', 'Sales Executive'),
    ('Michael Wilson', 120000.00, 5, '2018-07-12', 'Marketing Director'),
    ('Sarah Clark', 50000.00, 1, '2023-05-07', 'Junior Developer'),
    ('David Lee', 85000.40, 3, '2017-01-10', 'Financial Analyst'),
    ('Laura Adams', 60000.30, 2, '2021-09-16', 'HR Coordinator'),
    ('Chris Martinez', 110000.50, 4, '2019-08-24', 'Sales Manager'),
    ('Olivia Johnson', 95000.00, 5, '2020-11-14', 'Brand Strategist');

-- request 7: show all employees
SELECT * FROM employees;

-- request 8: show employees from a particular department
SELECT * FROM employees WHERE department_id = 5;

-- request 9: count employees from each department
SELECT employees.department_id, departments.name,
       COUNT(*) AS employees_count
FROM employees
         JOIN departments ON employees.department_id = departments.id
GROUP BY department_id, departments.name
ORDER BY department_id;

-- request 10: calculate the total salary of each department
SELECT employees.department_id, departments.name,
       SUM(monthly_salary) AS total_salary
FROM employees
         JOIN departments ON employees.department_id = departments.id
GROUP BY department_id, departments.name
ORDER BY department_id;

-- request 11: Arrange employees by salary in descending order
SELECT * FROM employees ORDER BY monthly_salary DESC;

-- request 12: Arrange employees by hire_date in ascending order
SELECT * FROM employees ORDER BY hire_date;

-- request 13: show departments of which the number of employees is greater than 3
-- first insert some more employees
INSERT INTO employees (name, monthly_salary, department_id, hire_date, position)
VALUES ('Ronaldo', 100000, 1, '2025-11-01','Junior Backend Developer'),
       ('Messi', 150000, 1, '2025-11-01','Senior Frontend Developer'),
       ('Ronaldinho', 80000, 3, '2025-12-02','Accountant'),
       ('David Beckham', 120000, 3,'2025-12-03', 'Accountant');

-- join and filter
SELECT departments.id, departments.name, COUNT(*) AS employees_count
FROM employees
         JOIN departments ON employees.department_id = departments.id
GROUP BY departments.id, departments.name
HAVING COUNT(*) > 3
ORDER BY departments.id;

-- request 14: show departments of which total salary is greater than 30 000
SELECT departments.id, departments.name, SUM(employees.monthly_salary) AS total_salary
FROM employees
         JOIN departments ON employees.department_id = departments.id
GROUP BY departments.id, departments.name
HAVING SUM(employees.monthly_salary) > 30000
ORDER BY departments.id;

-- request 15: show employees whose salaries are above the average
SELECT * FROM employees
WHERE monthly_salary > (SELECT AVG(monthly_salary) FROM employees);

-- request 16: show the name of the department which the employee who has the highest salary belongs to
SELECT departments.name AS department_name
FROM employees
         JOIN departments ON employees.department_id = departments.id
WHERE monthly_salary = (SELECT MAX(monthly_salary) FROM employees);

-- request 17: use WITH to calculate average salary by department_id
WITH average_department_salary AS (
    SELECT department_id, AVG(monthly_salary) AS average_salary
    FROM employees
    GROUP BY department_id
)
SELECT departments.id, departments.name,
       average_salary
FROM average_department_salary
         JOIN departments ON average_department_salary.department_id = departments.id;

-- request 18: use the above result to show employees whose salary is above the average of their own departments

-- WITH average_department_salary AS (
--     SELECT department_id, AVG(monthly_salary) AS average_salary
--     FROM employees
--     GROUP BY department_id
-- )
-- SELECT employees.id, employees.name, employees.monthly_salary,
--        average_salary AS avg_dept_salary
-- FROM employees
--          JOIN average_department_salary ON employees.department_id = average_department_salary.department_id
-- WHERE employees.monthly_salary > average_department_salary.average_salary;

WITH average_department_salary AS (
    SELECT department_id, AVG(monthly_salary) AS average_salary
    FROM employees
    GROUP BY department_id
)
SELECT departments.id, departments.name,
       average_salary AS avg_dept_salary,
       jsonb_agg(
               jsonb_build_object(
                       'id', employees.id, 'name', employees.name, 'monthly_salary', employees.monthly_salary
               )) AS employees_with_higher_salary
FROM departments
         JOIN average_department_salary ON departments.id = average_department_salary.department_id
         JOIN employees ON employees.department_id = departments.id
WHERE employees.monthly_salary > average_department_salary.average_salary
GROUP BY departments.id, departments.name, avg_dept_salary
ORDER BY departments.id;

-- request 19: show the departments with their employees' array in JSON format
SELECT departments.id, departments.name,
       jsonb_agg(jsonb_build_object('id',employees.id,'name',employees.name)) AS employees
FROM employees
         JOIN departments ON employees.department_id = departments.id
GROUP BY departments.id, departments.name
ORDER BY departments.id;

-- request 20: create a temporary column to classify monthly salary
SELECT id, name, monthly_salary,
       CASE WHEN monthly_salary >= 15000 THEN 'HIGH'
            ELSE 'LOW'
           END AS salary_class
FROM employees;

-- request 21: classify the rank of employees: Manager: High rank, Staff: Low rank
SELECT id, name, position,
       CASE
           WHEN position ILIKE '%manager%'  OR position ILIKE '%director%' THEN 'High rank'
           ELSE 'Low rank'
END AS rank
FROM employees;

-- request 22: explain analyze the query to select all employees by department
EXPLAIN ANALYZE
SELECT departments.id, departments.name,
       jsonb_agg(jsonb_build_object('id',employees.id,'name',employees.name)) AS employees
FROM employees
         JOIN departments ON employees.department_id = departments.id
GROUP BY departments.id, departments.name
ORDER BY departments.id;

-- request 23: explain analyze the query to show all employees whose salary is above the average
EXPLAIN ANALYZE
SELECT * FROM employees
WHERE monthly_salary > (SELECT AVG(monthly_salary) FROM employees);

