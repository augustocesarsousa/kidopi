<?php
    // IP do servidor
    $host = "127.0.0.1";
    // usuário do banco
    $user = "root";
    // senha do banco
    $password = "";
    // nome da base
    $dbname = "db_kidopi";
    // porta do banco
    $port = 3306;

    // tenta fazer a conexão
    try{        
        $conn = new PDO("mysql:host=$host;port=$port;dbname=".$dbname, $user, $password);

        //echo "Conexão com banco de dados realizado com sucesso!";
    }  catch(PDOException $err){
        echo "Erro ao conectar com o banco de dados " . $err->getMessage();
    }
?>