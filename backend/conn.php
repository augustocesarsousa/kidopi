<?php
    $host = "127.0.0.1";
    $user = "root";
    $password = "root@123";
    $dbname = "db_kidopi";
    $port = 3306;

    try{
        $conn = new PDO("mysql:host=$host;port=$port;dbname=".$dbname, $user, $password);

        //echo "Conexão com banco de dados realizado com sucesso!";
    }  catch(PDOException $err){
        echo "Erro ao conectar com o banco de dados " . $err->getMessage();
    }
?>