<?php
  $string = $_GET['string'];
  $string = strtolower($string);
  $string = str_ireplace(' ', '_', $string);
  $sArray = str_split($string);
  $newName  = 'lg_';
  foreach($sArray as $char){
    if(($char >= '0' && $char <= '9') || ($char >= 'A' && $char <= 'Z') || ($char >= 'a' && $char <= 'z') || ($char == '_')) {
      $newName .= $char;
    }
  }
	$newName .= '.php';
	echo $string, ' => ', $newName;
?>
