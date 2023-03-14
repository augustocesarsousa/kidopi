<?php
    // chama o arquivo de conexão
    include("conn.php");

    // monta a query
    $sql = "SELECT name FROM tb_country";
    // prepara a query
    $result = $conn->prepare($sql);
    // executa a query
    $result->execute();
    
   // valida se teve retorno
   if(($result) and ($result->rowCount() != 0)){
        
        // cria um loop para montar os dados de retorno
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            // extrai o retorno pelas colunas
            extract($row);
            // monta o corpo da resposta
            $data[] = [
                'country' => $name
            ];
        }
        // adiciona os dados de retorno na variavel auxiliar
        $return = ['status' => true, 'data' => $data];
    } else {
        // se não tiver retorno, adiciona a mensagem na variável auxiliar
        $return = ['status' => false, 'message' => 'Nenhum país cadastrado, verifique com o administrador!'];
    }

    // retorna os dados em formato JSON
    echo json_encode($return);
?>