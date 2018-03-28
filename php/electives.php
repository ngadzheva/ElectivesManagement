<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>

        <title>Система за управление на избираеми дисциплини</title>

        <link rel="stylesheet" type="text/css" href="css/styles.css"/>
    </head>

    <body>
        <header>
            <h1>СИСТЕМА ЗА УПРАВЛЕНИЕ НА ИЗБИРАЕМИ ДИСЦИПЛИНИ</h1>
            <figure>
                <img id="header" src="img/border.png"/>
            </figure>
            
            <nav>
                <ul>
                    <li>
                        <a href="index.html">Начало</a>
                    </li>
                    <li>
                        <a href="php/electives.php">Избираеми дисциплини Зимен семестър</a>
                    </li>
                    <li>
                        <a href="php/electives.php">Избираеми дисциплини Летен семестър</a>
                    </li>
                    <li>
                        <a href="html/login.html">Вход</a>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <?php
                require "electvesList.php";
            ?>
        </main>

        <footer>
            <p>© 2018 KNRR</p>
        </footer>
    </body>
</html>