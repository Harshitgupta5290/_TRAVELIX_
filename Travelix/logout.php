<?php

session_start();
unset($_SESSION['map_user_id']);
unset($_SESSION['map_user_name']);
unset($_SESSION['map_user_image']);
unset($_SESSION['user_image']);
unset($_SESSION['map_user_type']);
session_destroy();
header("location:login.php");
ob_flush();
?>

