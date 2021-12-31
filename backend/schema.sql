BEGIN TRANSACTION;

DROP TABLE IF EXISTS wt_user, issuer_Type, warranty;
DROP SEQUENCE IF EXISTS seq_user_id, seq_issuer_type_id, seq_warranty_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;
 
CREATE SEQUENCE seq_issuer_type_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;
  
CREATE SEQUENCE seq_warranty_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

CREATE TABLE wt_user (
        id INT DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
        username VARCHAR(50) NOT NULL,
        password_hash VARCHAR(500) NOT NULL,
        CONSTRAINT PK_user PRIMARY KEY (id)
);

INSERT INTO wt_user (username, password_hash) VALUES ('admin', 'password');

CREATE TABLE issuer_type (
        id INT DEFAULT nextval('seq_issuer_type_id'::regclass) NOT NULL,
        description VARCHAR(50) NOT NULL,
        CONSTRAINT PK_issuer_type PRIMARY KEY (id)
);

INSERT INTO issuer_type (description) VALUES ('Manufacturer'), ('Retailer'), ('Third-Party');

CREATE TABLE warranty (
        id INT DEFAULT nextval('seq_warranty_id'::regclass) NOT NULL,
        user_id INT NOT NULL,
        product VARCHAR(100),
        purchase_date DATE,
        expiration_date DATE,
        issuer VARCHAR(100),
        issuer_type_id INT,
        pop_image OID,
        pop_url VARCHAR(500),
        
        CONSTRAINT pk_warranty PRIMARY KEY(id),
        CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES wt_user(id),
        CONSTRAINT fk_issuer_id FOREIGN KEY(issuer_type_id) REFERENCES issuer_type(id)
);
 
COMMIT TRANSACTION;
