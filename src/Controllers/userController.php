<?php 
include '../Models/User.php';

use Model\User;

class userController{

    public static function createUser(){

        $nameS     = filter_var($_POST['name'], FILTER_SANITIZE_STRING); 
        $lastNameS = filter_var($_POST['lastName'], FILTER_SANITIZE_STRING); 
        $userNameS = filter_var($_POST['userName'], FILTER_SANITIZE_STRING);
        $passwordS = filter_var($_POST['password'], FILTER_SANITIZE_STRING);

        $password = password_hash($passwordS,PASSWORD_BCRYPT);

        $respuestaModel = User::createUser($nameS, $lastNameS, $userNameS, $password);

        if($respuestaModel['code'] == 202){
            $response = array(
                'code' => 202,
                'mensaje' => "Usuario registrado"
            );
        }else{
            $response = array(
                'code' => 400,
                'mensaje' => "{$respuestaModel['mensaje']}"
            );
        }

        return json_encode($response);
        
    }


    public static function login(){
        
        $user = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
        $pass = filter_var($_POST['password'],FILTER_SANITIZE_STRING);

        $respuesta = User::login($user, $pass);

        return json_encode($respuesta) ;

    }

    public static function close(){
        
        session_start();

        session_destroy();

       return [
           'code' => 200,
           'mensaje' => 'session close'
       ];

    }


}

if(isset($_POST['accion']) && $_POST['accion'] == 'createUser'){
    echo userController::createUser();
}else if (isset($_POST['accion']) && $_POST['accion'] == 'login'){
    echo userController::login();
}else if (isset($_POST['accion']) && $_POST['accion'] == 'cerrar'){
    echo userController::close();
}


