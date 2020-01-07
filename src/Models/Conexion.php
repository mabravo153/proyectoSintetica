<?php 

namespace Model\Connect;

use PDO;

class Conexion{

    public static function conectar(){

       try {
         //$data = new PDO('mysql:host=puntaje.cnvwfa5zqlmr.us-east-2.rds.amazonaws.com;dbname=prueba','mabravo153','Barranquilla1.');
         $data = new PDO('mysql:host=localhost;dbname=prueba','mabravo153','Barranquilla1.');
        
        } catch (\Exception $e) {
          $data = array(
              'code' => 404,
              'mensaje' => "{$e}"
          );
        }
        
        return $data;
    } 
}