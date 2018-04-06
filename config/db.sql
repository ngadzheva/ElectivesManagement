CREATE DATABASE uxProj; 

USE uxProj;

CREATE TABLE users(
    userName VARCHAR(200),
    passwd VARCHAR(200) NOT NULL,
    userType VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    PRIMARY KEY(userName)
); 

CREATE TABLE admin(
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(200),
    names VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(userName) REFERENCES users(userName)
);

CREATE TABLE lecturer(
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(200),
    names VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(userName) REFERENCES users(userName)
);

CREATE TABLE student(
    fn INT NOT NULL,
    userName VARCHAR(200),
    names VARCHAR(200) NOT NULL,
    year INT,
    bachelor_program VARCHAR(200),
    PRIMARY KEY (fn),
    FOREIGN KEY(userName) REFERENCES users(userName)
);

CREATE TABLE electives(
    name VARCHAR(200),
    lecturer INT,
    fullDescription VARCHAR(2000),
    shortDescription VARCHAR(500),
    credits INT,
    term VARCHAR(200),
    cathegory VARCHAR(200),
    rating INT,
    PRIMARY KEY (name),
    FOREIGN KEY(lecturer) REFERENCES lecturer(id)
);

CREATE TABLE messages(
    id INT AUTO_INCREMENT,
    sdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR(2000),
    sender VARCHAR(200),
    reciver VARCHAR(200),
    PRIMARY KEY (id),
    FOREIGN KEY(sender) REFERENCES users(userName),
    FOREIGN KEY(reciver) REFERENCES users(userName)
);

CREATE TABLE chElectives(
    id INT AUTO_INCREMENT,
    name VARCHAR(200),
    credits INT,
    fn INT,
    grade INT DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY(name) REFERENCES electives(name),
    FOREIGN KEY(fn) REFERENCES student(fn)
);
