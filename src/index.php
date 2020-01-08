<?php

include 'Controllers/indexController.php';
use Controllers\indexController;

$html = indexController::retornar();

require $html;

?> 
