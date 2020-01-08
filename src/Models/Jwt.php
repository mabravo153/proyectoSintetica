<?php 

namespace Model;

class Auth{

    public static function verificarSesion(){


       session_start();

        $auth = false; 

        if ($_SESSION['time'] < time() - 84600) { 
            session_destroy();    
            return $auth = false; 
        }

        if (isset($_SESSION['auth']) && $_SESSION['auth'] == true ) {
            $auth = true;
        }

        return $auth;

    }
   
}