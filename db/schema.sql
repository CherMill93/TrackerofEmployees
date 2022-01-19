DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS employee;

create table department (
  id integer auto_increment primary key,
  dept_name varchar(30) not null
);

create table job (
  id integer auto_increment primary key,
  title_name varchar auto_increment primary key,
  salary decimal(6, 2),
  department_id integer
);

create table employee (
  id integer auto_increment primary key
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id integer,
  manager_id integer
);