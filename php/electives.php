<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>

        <title>Система за управление на избираеми дисциплини</title>

        <link rel="stylesheet" type="text/css" href="../css/styles.css"/>
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
                        <a href="../index.html">Начало</a>
                    </li>
                    <li>
                        <a href="php/electives.php?id=winter">Избираеми дисциплини Зимен семестър</a>
                    </li>
                    <li>
                        <a href="php/electives.php?id=summer">Избираеми дисциплини Летен семестър</a>
                    </li>
                    <li>
                        <a href="../html/login.html">Вход</a>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <section>
                <fieldset>
                    <legend>Филтриране</legend>
                    <form method="get" action="electives.php" class="filter">
                        <label>Категория</label> 
                        <select>
                            <option value="name">Име на дисциплина</option>
                            <option value="lecturer">Име на лектор</option>                                <option value="cathegory">Категория</option>
                            <option value="rating">Рейтинг на дисциплина</option>
                        </select>
                        <input type="text" name="input"></input>
                        <input type="submit" value="Филтриране"></input>
                    </form>
                </fieldset>
            </section>
            <?php
                require "electivesList.php";
            ?>
        </main>

        <footer>
            <p>© 2018 KNRR</p>
        </footer>
    </body>
</html>