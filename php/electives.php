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
                <img id="header" src="../img/border.png"/>
            </figure>
            
            <nav>
                <ul>
                    <li>
                        <a href="../index.html">Начало</a>
                    </li>
                    <li>
                        <a href="electives.php?id=winter">Избираеми дисциплини Зимен семестър</a>
                    </li>
                    <li>
                        <a href="electives.php?id=summer">Избираеми дисциплини Летен семестър</a>
                    </li>
                    <li>
                        <a href="../html/login.html">Вход</a>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <section class="filterSection">
               <form class="filter" method="get" action="electives.php">
                    <input class="search" type="text" name="input"></input>
                    <label>Категория</label> 
                    <select>
                        <option value="name">Име на дисциплина</option>
                        <option value="lecturer">Име на лектор</option>                                
                        <option value="cathegory">Категория</option>
                        <option value="rating">Рейтинг на дисциплина</option>
                    </select>
                    <input type="submit" value="Филтриране"></input>
                </form>

                <?php
                    require "electivesList.php";
                ?>
            </section>
        </main>

        <footer>
            <p>© 2018 KNRR</p>
        </footer>
    </body>
</html>