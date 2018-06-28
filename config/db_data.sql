USE uxProj;

INSERT INTO `users` (userName, passwd, userType, active, email)
VALUES ('nmgadzheva', 'a054c563253f561fd63003cf7af86d7aebbb5a603d346d859157fb518988a1ec', 'student', TRUE, 'v3n17oy@abv.bg');

INSERT INTO `users` (userName, passwd, userType, active, email)
VALUES ('pboychev', '58ec05393ccf774c5c89046cca4573f2e7ad695650fa3accaec8fd0be67731d5', 'lecturer', TRUE, 'boytchev@fmi.uni-sofia.bg');

INSERT INTO `users` (userName, passwd, userType, active, email)
VALUES ('hrhristov', '2b32e24a7f0cd189017a5e1a73d30dc4d274c181caaf11d5026cbdc837bd2c3e', 'lecturer', TRUE, 'hristohristov@fmi.uni-sofia.bg');

INSERT INTO `users` (userName, passwd, userType, active, email)
VALUES ('vgeorgiev', '738739418608df05d6f63c896f42e201ecf3c3f330ed442615d788e5775c96dc', 'lecturer', TRUE, 'v.georgiev@fmi.uni-sofia.bg');

INSERT INTO `student` (fn, userName, names, year, bachelorProgram)
VALUES (61938, 'nmgadzheva', 'Невена Михайлова Гаджева', 3, 'Софтуерно инженерство');

INSERT INTO `lecturer` (userName, names, department, telephone, visitingHours, office)
VALUES ('pboychev', 'Павел Христов Бойчев', 'Информационни технологии', '+359 2 8161 553', 'понеделник 12:00 - 13:00; сряда 15:00 - 16:00', 'ФМИ-512');

INSERT INTO `lecturer` (userName, names, department, office)
VALUES ('hrhristov', 'Христо Димов Христов', 'Компютърна информатика', 'ФМИ-111');

INSERT INTO `lecturer` (userName, names, department, telephone, visitingHours, office)
VALUES ('vgeorgiev', 'Васил Георгиев Цунижев', 'Компютърна информатика', '+359 2 8161 594', 'вторник 13.00-14.00; четвъртък 14.00-15.00', 'ФМИ-110');

INSERT INTO `electives` (name, lecturer, description, credits, recommendedYear, recommendedBachelorProgram, literature, subjects, term, cathegory, active, rating, type)
VALUES ('Езици и среди за обучение', 1, 'Целта на курса е да даде практически знания на студентите в областта на създаването на интерактивни графични онлайн образователни модули. Курсът запознава с базовите технологии – HTML5, CSS и JavaScript. При разглеждане на основните понятия и алгоритми се използва специално разработената за целите на курса компютърна среда СУИКА. Тази среда предоставя възможност за лесно и бързо моделиране на тримерни конструкции, с които да се демонстрират основни понятия от точните науки. Създаваните модели са многоплатформени на хардуерно и софтуерно ниво. Особено внимание се обръща на създаването на такива интерактивни или анимирани модели, които биха подпомогнали дейността на учителите. Ще бъдат разгледани методи за създаване на онлайн приложения, където потребителите ще могат динамично да контролират създадените от тях виртуални модели чрез програмируем графичен интерфейс.  В края на курса е предвиден проект с цел да се затвърди умението за създаване на цялостен програмен продукт и на учебно съдържание. Началната работа по проекта ще се осъществява по време на последните упражненията в курса, като завършването на проекта ще става извънаудиторно.', 
7, 2, 'И, ИС, КН, М, ПМ, СИ', '{"Kouichi Matsuda, Rogger Lea (2013) WebGL Programming Guide, Addison-Wesley, ISBN 978-0-321-90292-4": "Основна", "Peter Shirley, Steve Marschner (2009), Fundamentals of Computer Graphics, 3rd ed., CRC Press, ISBN 978-1-56881-469-8": "Основна", "Jacob Seidelin (2012), HTML5 Games: Creating fun with HTML, CSS3, and WebGL, John Wiley & Sons Ltd. ISBN 978-1-119-97508-3": "Основна", "Цикъл от презентации, примери, задачи и решения на сайта на курса в Мудъл.": "Основна", "Онлайн ресурси за HTML5, CSS, JavaScript и DOM http://www.w3schools.com/html http://www.w3schools.com/css http://www.w3schools.com/js http://www.w3schools.com/jsref": "Допълнителна"}', 
'{"БАЗОВИ ТЕХНОЛОГИИ Запознаване с курса. HTML и HTML5. Каскадни стилове с CSS. JavaScript – синтактис и основни конструкции. Работа с Document Object Model за динамични уеб страници.": 6, "КОМПЮТЪРНА ГРАФИКА Математически основи на графиката. Координатни системи. Цветове. Основни графични обекти (вектор, точка, отсечка, квадрат, окръжност, куб, сфера, конус, цилиндър). Ориентация в пространството. Потребителски обекти. Визуализация на математически обекти.": 8, "АНИМАЦИЯ И ИНТЕРАКТИВНОСТ Основни принципи и реализации на анимацията. Движение по отсечка, по окръжност и по повърхността на обемен обект. Работа с мишка и интерактивно манипулиране на графични обекти. Гледна точка. Проектиране и създаване на графичен интерфейс. Работа с устройства с чувствителни на докосване екрани.": 8, "ОБРАЗОВАТЕЛЕН СОФТУЕР И УЧЕБНО СЪДЪРЖАНИЕ Създаване на урок - планиране, документация, учебни примери и задачи. Проектиране на урок за малки ученици, за възрастни хора, за потребители със специфични нужди. Настройки на цвят, размер, помощна информация. Примерно разработване на проекти в три различни области: математика, физика и химия": 8}',
'winter', 'ЯКН', TRUE, 6, 'active');

INSERT INTO `electives` (name, lecturer, description, credits, recommendedYear, recommendedBachelorProgram, literature, subjects, term, cathegory, active, rating, type)
VALUES ('Мобилни приложения', 2, 'Дисциплината запознава с разработванетона клиентскии сърверни приложения за безжични терминали (микротерминали). Курсът включва функционално описание на протоколите и слоевете от HTML  5.0 стека, както и компонентите на Wеb архитектурата. Специално внимание е отделено на проектирането на клиентската страна със средствата на форматиращия език HTML и скрипт езика JavaScript. Описанието  на  сърверната  страна  включва  програмния  модел  на  интерфейсна технология CGI, основни сведения за програмиране динамични и интерактивни приложения с Perl и ASP и публикуване на Wеb съдържанието. Изложената в курса функционалност  на  приложенията  за  Web - платформа  е  представена  и  със средствата  на XHTML /CSS,  коята  е  съвременната  среда  за проектиране  на [мобилно] Интернет - съдържане. Обучението се базира на широк набор от примерни приложения и работа с терминални емулатори. Курсът е предназначен за студенти от бакалавърската програма по информатика, както и за студенти от магистърските програми по информационни системи и разпределени системи.', 
5, 2, 'И, ИС, КН, СИ', '{"Neuburg, М. Programming iOS 8: Dive Deep into Views, View Controllers, and Frameworks, O’Reilly, ISBN-13: 978-1491908730, 2014;": "Основна", "Deitel, P. Android for Programmers: An App-Driven Approach, Perason Education, ISBN-13: 978-0133570922, 2014.": "Основна", "Статиите във Wikipedia по съответната тема и свързаните термини.": "Допълнителна"}', '{"Основни принципи за разработка на мобилни и интернет приложения": 3, "Архитектура на мобилните приложения": 2, "User experience and Responsive design": 3, "Сигурност в мобилните приложения": 2, "Off-line мобилни приложения": 3, "Мобилни бази от данни": 3, "HTML 5 базирани приложения с MVC .NET": 4, "Win 8 базирани приложения": 4, "iOS базирани приложения": 2, "Android базирани приложения": 4}',
 'summer', 'ОКН', TRUE, 8, 'active');

INSERT INTO `electives` (name, lecturer, description, credits, recommendedYear, recommendedBachelorProgram, subjects, term, cathegory, active, rating, type)
VALUES ('Мобилно Интернет съдържание', 3, 'Курсът покрива най-модерните тенденции и техноологии в разработването на мобилни и интернет базирани приложения. Той разглежда както HTML 5 базирани приложения чрез MVC .NET  така и разработени на “native” за най-наложените мобилни операционни системи win 8.1, iOS, Android. Основни принци като проектиране на интерфейси за мобилни устройства и таблети, софтуерен дизайн на мобилни приложения и мобилни бази от данни, responsive design,  user experience, offline режим  интернет стандарти за комуникация така и сигурност на данните. Курсът включва много практика и разглеждане на реални примери от  проекти и/или case studies от България и чужбина.', 
5, 2, 'И, ИС, КН, ПМ, СИ', '{"Мобилни технологии, Интернет и HTML": 5, "XHTML спецификации": 4, "CSS спецификации": 4, "Адаптиране на съдаржението": 5, "Мобилни браузъри (микробраузъри)": 4, "Оптимизиране и тестване на съдържанието": 4, "Архитектура и разгръщане на мобилна Интернет старница": 4}',
 'summer', 'ЯКН', TRUE, 7, 'active');

INSERT INTO `electives` (name, description, recommendedYear, recommendedBachelorProgram, term, cathegory, active, type)
VALUES ('VR', 'Основи в разработването на VR приложения.', 4, 'И, КН, СИ', 'winter', 'ЯКН', TRUE, 'suggestion');

INSERT INTO `chElectives` (name, credits, fn, grade, enrolledDate)
VALUES ('Езици и среди за обучение', 7, 61938, 6, '2017-09-20 20:05:53');

INSERT INTO `chElectives` (name, credits, fn, grade, enrolledDate)
VALUES ('Мобилни приложения', 5, 61938, 5, '2018-02-05 10:00:05');

INSERT INTO `campaign` (startDate, endDate)
VALUES ('2018-02-10', '2018-02-20');

INSERT INTO `campaign` (startDate, endDate)
VALUES ('2018-06-11', '2018-06-23');

INSERT INTO `messages` (sdate, about, content, sender, receiver, opened)
VALUES ('2018-06-11 12:37:32', 'Защити на проекти', 'Здравейте! Защитите на проектите ще бъдат на 16.06.2018г.', 'hrhristov', 'nmgadzheva', FALSE);

INSERT INTO `messages` (sdate, about, content, sender, receiver, opened)
VALUES ('2018-06-11 19:03:10', 'Краен срок за предаване на проект', 'Здравейте! До кога е крайният срок за предаване на проектите?', 'nmgadzheva', 'pboychev', TRUE);

INSERT INTO `comments` (content, elective, user, timePosted)
VALUES ('Супер избираема', 'Мобилни приложения', 'nmgadzheva', '2018-06-15 16:29:25');

INSERT INTO `schedule` (elective, lecturesType, day, hours, hall)
VALUES ('Мобилни приложения', 'лекции+пракрикум', 'вторник', '17:00-21:00', 107);

INSERT INTO `schedule` (elective, lecturesType, day, hours, hall)
VALUES ('Мобилно интернет съдържание', 'лекции+пракрикум', 'понеделник', '18:00-22:00', 107);

INSERT INTO `exams` (elective, examType, date, hall)
VALUES ('Мобилни приложения', 'П', '2018-06-16 09:00', 321);

INSERT INTO `exams` (elective, examType, date, hall)
VALUES ('Мобилни приложения', 'П', '2018-06-23 09:00', 107);

INSERT INTO `exams` (elective, examType, date, hall)
VALUES ('Мобилни приложения', 'У', '2018-06-30 09:00', 107);

INSERT INTO `exams` (elective, examType, date, hall)
VALUES ('Мобилно интернет съдържание', '', '2018-07-02 09:30', 325);
