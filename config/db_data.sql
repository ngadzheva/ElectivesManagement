USE uxProj;

INSERT INTO `users` (userName, passwd, email, userType) 
VALUES ('t1', '123456', 'a@abv.bg', 'student');

INSERT INTO `student` (fn, userName, names, year, bachelor_program)
VALUES (61000, 't1', 'a b c', 1, 'SE');

INSERT INTO `users` (userName, passwd, email, userType) 
VALUES ('t2', '123456', 'b@abv.bg', 'lecturer');

INSERT INTO `lecturer` (userName, names) VALUES ('t2', 'd e f');

INSERT INTO `users` (userName, passwd, email, userType) 
VALUES ('t3', '123456', 'a@abv.bg', 'lecturer');

INSERT INTO `lecturer` (userName, names) VALUES ('t3', 'А.Антонова');

INSERT INTO `users` (userName, passwd, email, userType) 
VALUES ('t4', '123456', 'tzm@abv.bg', 'lecturer');

INSERT INTO `lecturer` (userName, names) VALUES ('t4', 'Т. Зафирова-Малчева');

INSERT INTO `users` (userName, passwd, email, userType) 
VALUES ('t0', '123456', 'c@abv.bg', 'admin');

INSERT INTO `admin` (userName, names) VALUES ('t0', 'g h i');

INSERT INTO `electives` (name, lecturer, cathegory, credits, shortDescription, fullDescription, term, rating)
VALUES ('FP', 1, 'OKN', 4, 'FUNCTIONAL PROGRAMING', 'FUNCTIONAL PROGRAMING!!!!!', 'winter', 5);

INSERT INTO `electives` (name, lecturer, cathegory, credits, shortDescription, fullDescription, term, rating)
VALUES ('Elixir', 1, 'OKN', 5, 'FUNCTIONAL PROGRAMING2', 'FUNCTIONAL PROGRAMING WITH ELIXIR', 'summer', 5);

INSERT INTO `electives` (name, lecturer, cathegory, credits, shortDescription, fullDescription, term, rating)
VALUES ('Управление на знанието', 2, 'ОКН', 5, '...', '...', 'winter', 5);

INSERT INTO `electives` (name, lecturer, cathegory, credits, shortDescription, fullDescription, term, rating)
VALUES ('Електронно обучение', 3, 'ЯКН', 5, '...', '...', 'summer', 5);

INSERT INTO `chElectives`(`name`, `credits`, `fn`, `grade`) VALUES ('Elixir', 5, 61000, 5)