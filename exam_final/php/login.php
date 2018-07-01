<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'/>

        <title>Система за управление на избираеми дисциплини</title>

        <link rel='stylesheet' type='text/css' href='../css/styles.css'/>
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
            <section id='background'>
                <fieldset id='loginForm'>
                    <legend class='login'>Вход</legend>
                    <form name='login' method='post' action='loginValidation.php'>
                    
                        <?php 
                            session_start();

                            if(isset($_SESSION['loginError']) && $_SESSION['loginError']){
                                echo '<label class="error">' . $_SESSION['loginError'] . '</label>';
                                $_SESSION['loginError'] = '';
                            }
                        ?>

                        <label class='login'>Потребителско име</label>
                        <input class='login' type='text' name='user' id='userName'></input>
                        <label class='login'>Парола</label>
                        <input class='login' type='password' name='password' id='pass'></input>
                        <input class='login' type='submit' value='Вход'></input>
                    </form>
                </fieldset>
            </section>
        </main>

        <footer>
            <p>&copy; 2018 KNRR</p>
        </footer>
    </body>
</html>