<?php
    class Config
    {
        public static function _init()
        {
            $config = parse_ini_file(__DIR__ . '/../config/config.ini', true);
            if (!defined('CONFIG')) {
                define('CONFIG', $config);                
            }
        }
    }
?>