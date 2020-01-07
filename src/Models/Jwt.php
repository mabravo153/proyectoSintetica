<?php 

namespace Model;

require_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;


class Auth{

    public $keyh;

    public function __construct(){
        $this->keyh = "esto es una llave para decodificar 12.";
    }

    public function createJWT($id, $name, $username){
        
        $content = array(
            'sub' => $id,
            'name' => $name,
            'username' => $username,
            'iat' => time(), 
            'exp' => time() + (5 * 24 * 60 * 60),
            'auth' => 'auth'

        );

        $jwt = JWT::encode($content, $this->keyh, 'HS256');

        return $jwt;
    }

    public function decode($jwt, $getInfo = null){
        
        $auth = false; 

        try {
            $token = str_replace('"', '', $jwt);
            $tokenDeco = JWT::decode($token, $this->keyh, ['HS256']);
        } catch (\UnexpectedValueException $th) {
            $auth = false;
        } catch (\DomainException $th) {
            $auth = false;
        }

        if (!empty($tokenDeco) && is_object($tokenDeco) && $tokenDeco->auth == 'auth' ) {
            $auth = true;
        }

        if (!is_null($getInfo)) {
            return $tokenDeco;
        }

        return $auth;
        

    }


}