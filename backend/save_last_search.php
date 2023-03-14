<?php
    // chama o arquivo de conexão
    include_once "conn.php";

    // pega o dado enviado no corpo da requisição
    $country = $_POST['country'];
    // monta a query
    $sql = "INSERT INTO tb_last_search (country, date) VALUES (:country, NOW())";
    // prepara a query
    $result = $conn->prepare($sql);
    // adiciona o dado na vindo na requisição dentro da query
    $result->bindParam(':country', $country);
    // executa a query
    $result->execute();

    // verifica o retorno
    if($result->rowCount()){
        // monta a mensagem de retorno
        $response = ['erro' => false, 'message' => "Country successfully saved"];
    } else {
        // monta a mensagem de retorno
        $response = ['erro' => true, 'message' => "Failed to save country"];
    }

    // retorna os dados em formato JSON
    echo json_encode($response);
?>