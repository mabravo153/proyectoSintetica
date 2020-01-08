<?php

include '../Controllers/indexController.php';
use Controllers\indexController;
include 'Jwt.php';

use Model\Auth;

include 'modules/haf/header.php'; 

$autorizado = Auth::verificarSesion();

if ($autorizado) {
    $seccion = indexController::retornarModuloController();
}else{
    $seccion = "Views/modules/login.php";
}
include $seccion;


include 'modules/haf/footer.php';

?>

