<?php
    include("conn.php");
    $sql = "SELECT country, date FROM tb_last_search ORDER BY date DESC LIMIT 1";
    $result = $conn->prepare($sql);
    $result->execute();

    if(($result) and ($result->rowCount() != 0)){
        $row = $result->fetch(PDO::FETCH_ASSOC);
        extract($row);
        $return = ['status' => true, 'country' => $country, 'date' => $date];    
    } else {
        $return = ['status' => false, 'message' => 'Não foram encontrados registros'];
    }

    echo json_encode($return);
?>