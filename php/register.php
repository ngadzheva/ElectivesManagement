<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'/>

        <title>Система за управление на избираеми дисциплини</title>

        <link rel='stylesheet' type='text/css' href='../css/styles.css'/>
        <script type='text/javascript' src='../js/register.js'></script>
    </head>

    <body>
        <header>
            <h1>СИСТЕМА ЗА УПРАВЛЕНИЕ НА ИЗБИРАЕМИ ДИСЦИПЛИНИ</h1>
            <figure>
                <img id='header' src='../img/border.png'/>
            </figure>
            
            <nav id='mainNav'>
                <a href='../index.html'>Начало</a>
                <a href='../html/electives.html?id=winter'>Избираеми дисциплини Зимен семестър</a>
                <a href='../html/electives.html?id=summer'>Избираеми дисциплини Летен семестър</a>
                <a href='register.php'>Регистрация</a>
                <a href='login.php'>Вход</a>
            </nav>
        </header>                       

       <main>
            <section id='registerBackground'>
                <fieldset id='registerForm'>
                    <legend class='register'>Регистрация</legend>
                    <form name='register' method='post' action='registerValidation.php'>

                        <?php 
                            session_start();

                            if(isset($_SESSION['registrationError']) && $_SESSION['registrationError']){
                                echo '<label class="error">' . $_SESSION['registrationError'] . '</label>';
                                $_SESSION['registrationError'] = '';
                            }
                        ?>

                        <label class='register'>Три имена<mark id='star'>*</mark></label>
                        <input class='register' type='text' name='names' id='names' value=<?php echo isset($_SESSION['names']) ? $_SESSION['names'] : ''; $_SESSION['names'] = ''; ?>></input>
                        <label class='register'>Потребителско име<mark id='star'>*</mark></label>
                        <input class='register' type='text' name='user' id='userName' value=<?php echo isset($_SESSION['user']) ? $_SESSION['user'] : ''; $_SESSION['user'] = ''; ?>></input>
                        <label class='register'>Email<mark id='star'>*</mark></label>
                        <input class='register' type='email' name='email' id='email' value=<?php echo isset($_SESSION['email']) ? $_SESSION['email'] : ''; $_SESSION['email'] = ''; ?>></input>
                        <label class='register'>Парола<mark id='star'>*</mark></label>
                        <input class='register' type='password' name='password' id='pass'></input>
                        <label class='register'>Повтори парола<mark id='star'>*</mark></label>
                        <input class='register' type='password' name='confirmPassword' id='confirmPass'></input>
                        <label class='register'>Тип потребител<mark id='star'>*</mark></label>
                        <select class='register' name='userType' id='userType'>
                            <option value='-' selected='selected'>-</option>
                            <option value='student'>студент</option>
                            <option value='lecturer'>лектор</option>
                        </select>
                        <label class='student'>Факултетен номер<mark id='star'>*</mark></label>
                        <input class='student' type='number' name='fn' id='fn' min='10000' max='99999' value=<?php echo isset($_SESSION['fn']) ? $_SESSION['fn'] : ''; $_SESSION['fn'] = ''; ?>></input>
                        <label class='student'>Курс<mark id='star'>*</mark></label>
                        <input class='student' type='number' from='1' to='4' name='year' id='year' value=<?php echo isset($_SESSION['year']) ? $_SESSION['year'] : ''; $_SESSION['year'] = ''; ?>></input>
                        <label class='student'>Специалност<mark id='star'>*</mark></label>
                        <select class='student' name='bachelorPrograme'>
                            <option value='-' select='selected'>-</option>
                            <option value='Информатика'>Информатика</option>
                            <option value='Информационни системи'>Информационни системи</option>
                            <option value='Компютърни науки'>Компютърни науки</option>
                            <option value='Математика'>Математика</option>
                            <option value='Математика и информатика'>Математика и информатика</option>
                            <option value='Приложна математика'>Приложна математика</option>
                            <option value='Софтуерно инженерство'>Софтуерно инженерство</option>
                            <option value='Статистика'>Статистика</option>
                        </select>
                        <label class='lecturer'>Катедра<mark id='star'>*</mark></label>
                        <input class='lecturer' type='text' name='department' id='department' value=<?php echo isset($_SESSION['department']) ? $_SESSION['department'] : ''; $_SESSION['department'] = ''; ?>></input>
                        <label class='lecturer'>Телефон</label>
                        <input class='lecturer' type='tel' pattern='+359 [0-9]{1,4} [0-9]{2} [0-9]{2} [0-9]{2,3}' placeholder="+359 2 9999 999" name='telephone' id='telephone' value=<?php echo isset($_SESSION['telephone']) ? $_SESSION['telephone'] : ''; $_SESSION['telephone'] = ''; ?>></input>
                        <label class='lecturer'>Приемно време</label>
                        <input class='lecturer' type='text' name='visitingHours' id='visitingHours' value=<?php echo isset($_SESSION['visitingHours']) ? $_SESSION['visitingHours'] : ''; $_SESSION['visitingHours'] = ''; ?>></input>
                        <label class='lecturer'>Кабинет</label>
                        <input class='lecturer' type='text' name='office' id='office' value=<?php echo isset($_SESSION['office']) ? $_SESSION['office'] : ''?>></input>
                        <label class='lecturer'>Персонална страница</label>
                        <input class='lecturer' type='text' name='personalPage' id='personalPage' value=<?php echo isset($_SESSION['personalPage']) ? $_SESSION['personalPage'] : ''; $_SESSION['personalPage'] = ''; ?>></input>
                        <input class='register' type='submit' value='Регистрация'></input>
                    </form>
                </fieldset>
            </section>
        </main>

        <footer>
            <p>&copy; 2018 KNRR</p>
        </footer>
    </body>
</html>