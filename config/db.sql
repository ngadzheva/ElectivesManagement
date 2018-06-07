CREATE DATABASE uxProj CHARACTER SET utf8 COLLATE utf8_general_ci; 

USE uxProj;

CREATE TABLE users(
    userName VARCHAR(200),
    passwd VARCHAR(200) NOT NULL,
    userType VARCHAR(200) NOT NULL,
    active BOOL,
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
    department  VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    visitingHours VARCHAR(50) NOT NULL,
    office VARCHAR(100) NOT NULL,
    personalPage VARCHAR(200,)
    PRIMARY KEY (id),
    FOREIGN KEY(userName) REFERENCES users(userName)
);

CREATE TABLE student(
    fn INT NOT NULL,
    userName VARCHAR(200),
    names VARCHAR(200) NOT NULL,
    year INT,
    bachelorProgram VARCHAR(200),
    PRIMARY KEY (fn),
    FOREIGN KEY(userName) REFERENCES users(userName)
);

CREATE TABLE electives(
    name VARCHAR(200),
    lecturer INT,
    description VARCHAR(2000),
    credits INT,
    recomendedYear INT,
    recomendedBachelorProgram VARCHAR(200),
    literature JSON,
    subjects JSON,
    term VARCHAR(200),
    cathegory VARCHAR(200),
    campaign INT,
    active BOOL,
    rating INT,
    PRIMARY KEY (name),
    FOREIGN KEY(lecturer) REFERENCES lecturer(id),
    FOREIGN KEY (campaign) REFERENCES campaign(id)
);

CREATE TABLE messages(
    id INT AUTO_INCREMENT,
    sdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR(2000),
    sender VARCHAR(200),
    reciver VARCHAR(200),
    opened BOOL,
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

CREATE TABLE coments(
    id INT AUTO_INCREMENT,
    content VARCHAR(2000),
    elective VARCHAR(200),
    user VARCHAR(200),
    timePosted TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (elective) REFERENCES electives(name),
    FOREIGN KEY(user) REFERENCES users(userName)
);

CREATE TABLE campaign(
    id INT AUTO_INCREMENT,
    startDate DATE,
    endDate DATE,
    PRIMARY KEY (id)
);

