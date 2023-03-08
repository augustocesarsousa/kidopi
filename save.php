<?php
include("conn.php");

$country = $_POST['country'];
$sql = "INSERT INTO seach_api (country, date) VALUES ('$country', NOW())";
$result = $conn->query($sql);
$response = ['erro' => false, 'message' => $result];
if($result->num_rows == null){
    $response = ['erro' => false, 'message' => "Country successfully saved"];
} else {
    $response = ['erro' => true, 'message' => "Failed to save country"];
}

echo json_encode($response);
?>