<?php

namespace Model;
include 'Conexion.php';
include 'Jwt.php';

use Model\Connect\Conexion;
use PDO;

class Notas{

    public static function agregarNota($idUsuario, $nota){
       
        $pdo = Conexion::conectar();

        if (is_array($pdo)) {
           return $pdo;
        }else{

            try {
            $pdo->beginTransaction();

            $sql = $pdo->prepare( "INSERT INTO notas(nota_usuario, fk_user) VALUES (:nota_usuario, :fk_user)" );
            $sql->bindParam(':nota_usuario', $nota);
            $sql->bindParam(':fk_user', $idUsuario); 

            $sql->execute();

            if($sql->rowCount() != 0 ){
                $response = array(
                    'code' => 202,
                    'mensaje' => 'Aceptada'
                );
            }else{
                $response = array(
                    'code' => 404,
                    'mensaje' => "{$sql->errorCode()}  {$sql->errorInfo()}"
                );
            }

            $pdo->commit();

            $sql = null;
            $pdo = null;

            } catch (\Exception $th) {
                $response = array(
                    'code' => 404,
                    'mensaje' => $th->getMessage()
                );
            }
            return $response;
        }



    }

    public static function listarNotasUser($idUser){
    
        $pdo = Conexion::conectar(); 

        if (is_array($pdo)) {
            return $pdo;
        }else{
            
            try {
                
                $pdo->beginTransaction();

                $query = $pdo->prepare(" SELECT nota_usuario, nombre, apellido FROM users INNER JOIN notas 
                                         ON users.id = notas.fk_user WHERE notas.fk_user = :usuario ");
                $query->bindParam(':usuario', $idUser); 

                $query->execute();

                $arrayRespuesta = $query->fetchAll(PDO::FETCH_ASSOC);

                if (!empty($arrayRespuesta)) {
                    $respuesta = array(
                        'code' => 200,
                        'mensaje' => $arrayRespuesta
                    );
                }else{
                    $respuesta = array(
                        'code' => 400,
                        'mensaje' => 'el usuario no tiene registro de notas'
                    );
                }

                $pdo->commit();
                
            } catch (\Exception $th) {
                $pdo->rollBack();

                $respuesta = array(
                    'code' => 400, 
                    'mensaje' => $th->getMessage()
                );
            }

            return $respuesta;

        }

    }

}