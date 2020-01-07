<?php 
namespace Model;
include 'Conexion.php';
include 'Jwt.php';

use Model\Connect\Conexion;
use Model\Auth;
use PDO;

class User{

    
    public static function createUser(string $name_user, string $last_name, string $user_name, string $passwd){

        $conectar = Conexion::conectar();

        if (is_array($conectar)) {
            return $conectar;
        }else{
            try {

                $conectar->beginTransaction();
                
                /*$sql = $conectar->prepare( " INSERT INTO users (name, last_name, user_name, password) 
                                            VALUES (:name_user,:last_name, :userName, :passwd) ");*/

                $sql = $conectar->prepare( " INSERT INTO users (nombre, apellido, nombreUsuario,pass)
                                            VALUES (:name_user,:last_name, :userName, :passwd) ");

                $sql->bindParam(':name_user', $name_user);
                $sql->bindParam(':last_name', $last_name);
                $sql->bindParam(':userName', $user_name);
                $sql->bindParam(':passwd', $passwd);

                $sql->execute();

                if($sql->rowCount() != 0 ){
                    $response = array(
                        'code' => 202,
                        'mensaje' => 'Aceptada'
                    );
                }else{
                    $response = array(
                        'code' => 404,
                        'mensaje' => $sql->errorCode()
                    );
                }

                $conectar->commit();

                $sql = null;
                $conectar = null;

            } catch (\Throwable $th) {
               $response = array(
                   'code' => 400,
                   'mensaje' => "ocurrio un error {$th}"
               );

               $conectar->rollBack();

            }
            return $response;
            
        }
    }

    public function login(string $username, string $pass){

        $pdo = Conexion::conectar();
        $idUser   = null;
        $nameUser = null;
        $userName = null;
        $passHash = null;

        if (is_array($pdo)) {
            return $pdo;
        }else{
            try {

                $pdo->beginTransaction();

                $consulta = $pdo->prepare( " SELECT * FROM users WHERE  nombreUsuario = :nombreUsuario " );
                
                $consulta->bindParam(':nombreUsuario', $username);
                $consulta->execute();

                $consulta->bindColumn(1, $idUser);
                $consulta->bindColumn(2, $nameUser);
                $consulta->bindColumn(4, $userName);
                $consulta->bindColumn(5, $passHash);

                $consulta->fetch(PDO::FETCH_ASSOC);

                if (!empty($nameUser)) {

                    if (password_verify($pass, $passHash)) {

                        $auth = new Auth();
                        $jwt = $auth->createJWT($idUser, $nameUser, $userName);

                        $data = array(
                            'code' => 200,
                            'mensaje' => $jwt
                        );

                    }else{
                        $data = array(
                            'code' => 404,
                            'mensaje' => 'Contrasena invalida'
                        );
                    }
                }else{
                    $data = array(
                        'code' => 400,
                        'mensaje' => 'User name invalido'
                    );
                }

                $pdo->commit();

                $consulta = null;
                $pdo = null; 

            } catch (\Exception $th) {
               $pdo->rollBack();
               $data = array(
                   'code' => 404,
                    'mensaje' => $th->getMessage()
               );
            }

            return $data;

        }     
    }// final login 


}//final clase user


