<?php
include_once "conn.php";

$country = $_POST['country'];
$sql = "INSERT INTO seach_api (country, date) VALUES (:country, NOW())";
$result = $conn->prepare($sql);
$result->bindParam(':country', $country);
$result->execute();

if($result->rowCount()){
    $response = ['erro' => false, 'message' => "Country successfully saved"];
} else {
    $response = ['erro' => true, 'message' => "Failed to save country"];
}

echo json_encode($response);
?>