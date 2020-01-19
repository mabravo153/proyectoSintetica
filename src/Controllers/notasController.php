<?php

include '../Models/notasModel.php';

use Model\Notas;

class notasController{

    public static function enviarNotas(){
        $var = (float) $_POST['nota'];


        $variableId = filter_var($_POST['idUsuario'], FILTER_SANITIZE_NUMBER_INT);
        $variableNota = filter_var($var, FILTER_SANITIZE_NUMBER_FLOAT);

        $respuesta = Notas::agregarNota($variableId, $variableNota);

        return json_encode($respuesta);
        
    }

    public static function listarNotasUser(){
        
        $idUsuario = filter_var($_GET['datos'], FILTER_SANITIZE_NUMBER_INT);

        

        return json_encode($_GET);
        
    }

}

if(isset($_POST['accion']) && $_POST['accion'] == 'agregarNota'){
    echo notasController::enviarNotas();
}else if(isset($_GET['accion']) && $_GET['accion']== 'notas'){
    echo notasController::listarNotasUser();
}