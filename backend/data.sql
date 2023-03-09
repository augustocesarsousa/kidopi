CREATE DATABASE db_kidopi;

CREATE TABLE db_kidopi.tb_country ( 
    id INT NOT NULL AUTO_INCREMENT , 
    name TEXT NOT NULL , 
    PRIMARY KEY (id),
    UNIQUE (name(255))
);

CREATE TABLE db_kidopi.tb_last_search ( 
    id INT NOT NULL AUTO_INCREMENT , 
    country TEXT NOT NULL , 
    date DATETIME NOT NULL , 
    PRIMARY KEY (id)
);

INSERT INTO db_kidopi.tb_country (name) VALUES ('Australia');
INSERT INTO db_kidopi.tb_country (name) VALUES ('Brazil');
INSERT INTO db_kidopi.tb_country (name) VALUES ('Canada');