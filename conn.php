<?php
$conn = new mysqli('127.0.0.1','root','root@123','kidopi');
if ($conn->connect_error) {
    echo connect_error;
    die('Error : ('. $conn->connect_error .') '. $conn->connect_error);
}
?>