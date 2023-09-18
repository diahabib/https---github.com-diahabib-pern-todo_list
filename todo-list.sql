CREATE DATABASE todoList;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR2(255)
);