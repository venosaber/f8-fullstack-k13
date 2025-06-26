-- request 1: create table students
DROP TABLE IF EXISTS students;
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    birth_date DATE
);

-- request 2: create table teachers
DROP TABLE IF EXISTS teachers;
CREATE TABLE IF NOT EXISTS teachers (
    teacher_id SERIAL PRIMARY KEY,
    full_name VARCHAR(50),
    department VARCHAR(50)
);

-- request 3: create table courses
DROP TABLE IF EXISTS courses;
CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(50),
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE
);

-- request 4: create table enrollments
DROP TABLE IF EXISTS enrollments;
CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrolled_at DATE DEFAULT CURRENT_DATE,

    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);

-- request 5: add column phone to table students
ALTER TABLE students ADD COLUMN phone VARCHAR(20);

-- request 6: add 3 students
INSERT INTO students (full_name, email, birth_date, phone)
VALUES ('Phan Huy Hieu', 'phanhuyhieu@gmail.com', '1990-01-01','0123456789'),
       ('Ha Minh Thuy','test@gmail.com','1998-08-13','9876543210'),
       ('Nguyen Hong Anh', 'nguyenhonganh@gmail.com','2004-10-16','0966771508');

-- request 7: add 2 teachers
INSERT INTO teachers (full_name, department)
VALUES ('Nguyen Van Duc', 'IT'),
       ('Le Thi Van','English');

-- request 8: add 3 courses
INSERT INTO courses (course_name, teacher_id)
VALUES ('Frontend', 1),
       ('Backend', 1),
       ('English Writing', 2);

-- request 9: add 5 enrollments
INSERT INTO enrollments (student_id, course_id)
VALUES (1, 1),
       (1,2),
       (2, 1),
       (2, 3),
       (3, 2);

-- request 10: show all students
SELECT * FROM students;

-- request 11: show all courses and their teachers' names
SELECT course_id, course_name, teachers.full_name FROM courses JOIN teachers
ON courses.teacher_id = teachers.teacher_id;

-- request 12: show students' names and the names of courses they have enrolled
SELECT students.full_name, courses.course_name
FROM students JOIN enrollments ON students.student_id = enrollments.student_id
JOIN courses ON courses.course_id = enrollments.course_id;

-- request 13: update the phone number of the student whose email is test@gmail.com
UPDATE students SET phone = '0435520689' WHERE email = 'test@gmail.com';

-- request 14: update a course's name
UPDATE courses SET course_name = 'English Speaking' WHERE course_id = 3;

-- request 15: delete the student whose email is test@gmail.com
DELETE FROM students WHERE email = 'test@gmail.com';

-- request 16: delete the course of which name is Backend
DELETE FROM courses WHERE course_name = 'Backend';

-- request 17: show all courses and theirs teachers' names
SELECT course_name, teachers.full_name FROM courses JOIN teachers
ON courses.teacher_id = teachers.teacher_id;

-- request 18: show all courses and their teachers' names,
-- even those for which no teachers are assigned yet

-- insert some more courses for which no teachers are assigned yet
INSERT INTO courses (course_name)
VALUES ('Math'),
       ('Physics'),
       ('Chemistry');

-- if the course doesn't have a teacher yet, show 'Not assigned' instead of showing null values
SELECT course_name,
       COALESCE(teachers.full_name, 'Not assigned') AS teacher_full_name
FROM courses LEFT JOIN teachers ON courses.teacher_id = teachers.teacher_id;

-- request 19: show students' names and the IDs of the courses they have enrolled in
SELECT students.full_name, enrollments.course_id
FROM students JOIN enrollments ON students.student_id = enrollments.student_id;

-- request 20: show all courses and their enrolled students' names,
-- even those for which no students are enrolled
SELECT courses.course_id, courses.course_name, students.full_name
FROM courses LEFT JOIN enrollments ON courses.course_id = enrollments.course_id
LEFT JOIN students ON students.student_id = enrollments.student_id;