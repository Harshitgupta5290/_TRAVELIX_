<?php

error_reporting(0);
ob_start();
session_start();

$hostName = "localhost";
$dbUsername = "root";
$dbPassword = "harshit";
$dbName = "clever_travelers";

$conn = new mysqli($hostName, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
    die("Unable to conect to MySQL :" . $conn->connect_error);
}


if (isset($_SESSION['map_user_id'])) {
    $user_id = $_SESSION['map_user_id'];
} else {
    $user_id = "";
}

if (isset($_SESSION['map_user_name'])) {
    $user_name = $_SESSION['map_user_name'];
} else {
    $user_name = "";
}

if (isset($_SESSION['map_user_type'])) {
    $user_type = $_SESSION['map_user_type'];
} else {
    $user_type = "";
}

if (isset($_SESSION['map_user_image'])) {
    $user_image = $_SESSION['map_user_image'];
} else {
    $user_image = "";
}

if (isset($_SESSION['user_image'])) {
    $user_document = $_SESSION['user_image'];
} else {
    $user_document = "";
}
?>
