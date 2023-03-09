<?php
    include("conn.php");

    $sql = "SELECT name FROM tb_country";
    $result = $conn->prepare($sql);
    $result->execute();
    
    if(($result) and ($result->rowCount() != 0)){
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $data[] = [
                'country' => $name
            ];
        }
        $return = ['status' => true, 'data' => $data];
    } else {
        $return = ['status' => false, 'message' => 'Nenhum país cadastrado, verifique com o administrador!'];
    }

    echo json_encode($return);
?>