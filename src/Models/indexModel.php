<?php

class indexModel{

    public function retornarModuloModel($pagina)
    {
        
       if ($pagina == 'services' || $pagina == 'us' || $pagina == 'contact') {
           $modules = "Views/modules/{$pagina}.php";

           
       }else{
        $modules = "Views/modules/home.php";
       }

       return $modules;
    }

    
}