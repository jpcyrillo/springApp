# springApp
 
Para rodar este programa crie uma tabela no mysql e configure o arquivo application.properties:

mude o nome da database em sua_database
mude o username e password do seu banco dos campos usern e pass

spring.datasource.url=jdbc:mysql://localhost:3306/sua_database
spring.datasource.username=usern
spring.datasource.password=pass
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQLDialect

ao rodar o programa pela primeira vez, faça esses dois inserts:

INSERT INTO roles (name) VALUES("ROLE_USER");
INSERT INTO roles (name) VALUES("ROLE_ADMIN");