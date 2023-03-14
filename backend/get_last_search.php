<?php
    // chama o arquivo de conexão
    include("conn.php");
    
    // monta a query
    $sql = "SELECT country, date FROM tb_last_search ORDER BY date DESC LIMIT 1";
    // prepara a query
    $result = $conn->prepare($sql);
    // executa a query
    $result->execute();

    // valida se teve retorno
    if(($result) and ($result->rowCount() != 0)){
        // atribui o retorno para a variável auxiliar
        $row = $result->fetch(PDO::FETCH_ASSOC);
        // extrai o retorno pelas colunas
        extract($row);
        // adiciona os dados de retorno na variavel auxiliar
        $return = ['status' => true, 'country' => $country, 'date' => $date];    
    } else {
        // se não tiver retorno, adiciona a mensagem na variável auxiliar
        $return = ['status' => false, 'message' => 'Não foram encontrados registros'];
    }

    // retorna os dados em formato JSON
    echo json_encode($return);
?>