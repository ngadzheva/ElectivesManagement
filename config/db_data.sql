USE uxProj;

INSERT INTO `users` (userName, passwd, email, names, userType) 
VALUES ('t1', '123456', 'a@abv.bg', 'a b c', 'student');

INSERT INTO `student` (fn, userName, year, bachelor_program)
VALUES (61000, 't1', 1, 'SE');

INSERT INTO `users` (userName, passwd, email, names, userType) 
VALUES ('t2', '123456', 'b@abv.bg', 'd e f', 'lecturer');

INSERT INTO `lecturer` (userName) VALUES ('t2');

INSERT INTO `users` (userName, passwd, email, names, userType) 
VALUES ('t3', '123456', 'c@abv.bg', 'g h i', 'admin');

INSERT INTO `admin` (userName) VALUES ('t3');

INSERT INTO `electives` (name, lecturer, cathegory, credits, shortDescription, fullDescription, term, rating)
VALUES ('FP', 1, 'OKN', 4, 'FUNCTIONAL PROGRAMING', 'FUNCTIONAL PROGRAMING!!!!!', 'winter', 5);

INSERT INTO `electives` (name, lecturer, cathegory, credits, shortDescription, fullDescription, term, rating)
VALUES ('Elixir', 1, 'OKN', 5, 'FUNCTIONAL PROGRAMING2', 'FUNCTIONAL PROGRAMING WITH ELIXIR', 'summer', 5);