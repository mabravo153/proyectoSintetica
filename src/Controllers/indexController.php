<?php
include 'Models/indexModel.php';

class indexController{
    

    public function retornar(){
        include 'Views/template.php';
    }

    public function pageName()
    {
        $name = basename($_SERVER['PHP_SELF']);
        $page = str_replace(".php", "", $name);
        return $page;
    }

    public function retornarModuloController()
    {

        if(isset($_GET['accion'])){
            $accion = $_GET['accion'];

        }else{
            $accion = 'index';
        }

        $finalModule = indexModel::retornarModuloModel($accion);

        require $finalModule;

    }

}