<?php

namespace Model;
include 'Jwt.php';

use Model\Auth;
class indexModel{

    public static function retornarModuloModel($pagina){

       if ($pagina == 'login' || $pagina == 'register') {
           $modules = "Views/modules/{$pagina}.php";
       }else{
        $modules = "Views/modules/home.php";
       }

       return $modules;
    }
    
} 