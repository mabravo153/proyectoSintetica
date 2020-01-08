<?php
namespace Controllers;

include 'Models/indexModel.php';

use Model\indexModel;

class indexController{

    public static function retornar(){
       return 'Views/template.php';
    }

    public static function pageName()
    {
        $name = basename($_SERVER['PHP_SELF']);
        /*$page = str_replace(".php", "", $name);*/
        return $name;
    }

    public static function retornarModuloController()
    {
        if(isset($_GET['accion'])){
            $accion = $_GET['accion'];

        }else{
            $accion = 'index';
        }

        $modulo = indexModel::retornarModuloModel($accion);

        return $modulo;

    }

}