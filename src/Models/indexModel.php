<?php

class indexModel{

    public function retornarModuloModel($pagina)
    {
        
       if ($pagina == 'login' || $pagina == 'register') {
           $modules = "Views/modules/{$pagina}.php";

           
       }else{
        $modules = "Views/modules/home.php";
       }

       return $modules;
    }

    
}