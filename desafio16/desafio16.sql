CREATE database prueba;
use prueba;
CREATE TABLE items( 
	nombre VARCHAR(50) NOT NULL ,
    categoria VARCHAR(50) NOT NULL ,
    stock INT UNSIGNED NOT NULL ,
    id INT NOT NULL AUTO_INCREMENT ,
    PRIMARY KEY (`id`));
INSERT INTO items(nombre,categoria,stock) VALUES ('Fideos', 'Harina',20),
										  ('Leche','Lácteos',30),
                                          ('crema','Lácteos',15);
SELECT * FROM items;
DELETE FROM items WHERE id=1;
UPDATE items set stock=45 where id=2;
SELECT * FROM items;
