CREATE DATABASE uxProj CHARACTER SET utf8 COLLATE utf8_general_ci; 

USE uxProj;

CREATE TABLE users(
    userName VARCHAR(200),
    passwd VARCHAR(200) NOT NULL,
    userType VARCHAR(200) NOT NULL,
    active BOOLEAN,
    email VARCHAR(200) NOT NULL UNIQUE,
    PRIMARY KEY(userName)
); 

CREATE TABLE admin(
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(200),
    names VARCHAR(200) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(userName) REFERENCES users(userName) ON UPDATE CASCADE
);

CREATE TABLE lecturer(
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(200),
    names VARCHAR(200) NOT NULL,
    department  VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    visitingHours VARCHAR(50) NOT NULL,
    office VARCHAR(100) NOT NULL,
    personalPage VARCHAR(200),
    PRIMARY KEY (id),
    FOREIGN KEY(userName) REFERENCES users(userName) ON UPDATE CASCADE
);

CREATE TABLE student(
    fn INT NOT NULL,
    userName VARCHAR(200),
    names VARCHAR(200) NOT NULL,
    year INT,
    bachelorProgram VARCHAR(200),
    PRIMARY KEY (fn),
    FOREIGN KEY(userName) REFERENCES users(userName) ON UPDATE CASCADE
);

CREATE TABLE electives(
    name VARCHAR(200),
    lecturer INT,
    description VARCHAR(2000),
    credits INT,
    recommendedYear INT,
    recommendedBachelorProgram VARCHAR(200),
    literature VARCHAR(2000),
    subjects VARCHAR(2000),
    term VARCHAR(200),
    cathegory VARCHAR(200),
    active BOOLEAN,
    rating INT DEFAULT 0,
    type VARCHAR(10),
    PRIMARY KEY (name),
    FOREIGN KEY(lecturer) REFERENCES lecturer(id) ON UPDATE CASCADE
);

CREATE TABLE messages(
    id INT AUTO_INCREMENT,
    sdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    about VARCHAR(200),
    content VARCHAR(2000),
    sender VARCHAR(200),
    receiver VARCHAR(200),
    opened BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY(sender) REFERENCES users(userName) ON UPDATE CASCADE,
    FOREIGN KEY(receiver) REFERENCES users(userName) ON UPDATE CASCADE
);

CREATE TABLE chElectives(
    id INT AUTO_INCREMENT,
    name VARCHAR(200),
    credits INT,
    fn INT,
    grade INT DEFAULT 0,
    enrolledDate TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY(name) REFERENCES electives(name) ON UPDATE CASCADE,
    FOREIGN KEY(fn) REFERENCES student(fn) ON UPDATE CASCADE
);

CREATE TABLE comments(
    id INT AUTO_INCREMENT,
    content VARCHAR(2000),
    elective VARCHAR(200),
    user VARCHAR(200),
    timePosted TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (elective) REFERENCES electives(name) ON UPDATE CASCADE,
    FOREIGN KEY(user) REFERENCES users(userName) ON UPDATE CASCADE
);

CREATE TABLE campaign(
    id INT AUTO_INCREMENT,
    startDate DATE,
    endDate DATE,
    PRIMARY KEY (id)
);

CREATE TABLE schedule(
    id INT AUTO_INCREMENT,
    elective VARCHAR(200),
    lecturesType VARCHAR(20),
    day VARCHAR(10),
    hours VARCHAR(12),
    hall INT,
    PRIMARY KEY(id),
    FOREIGN KEY(elective) REFERENCES electives(name) ON UPDATE CASCADE
);

CREATE TABLE exams(
    id INT AUTO_INCREMENT,
    elective VARCHAR(200),
    examType CHAR,
    date TIMESTAMP,
    hall INT,
    PRIMARY KEY(id),
    FOREIGN KEY(elective) REFERENCES electives(name) ON UPDATE CASCADE
);

