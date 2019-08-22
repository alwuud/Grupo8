 CREATE database proyecto;
 use  proyecto;

CREATE TABLE categoria (
    codcategoria   INTEGER NOT NULL,
    nombre         VARCHAR(100) NOT NULL,
    descripcion    VARCHAR(200)
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( codcategoria );

CREATE TABLE cita (
    cliente_codcliente             INTEGER NOT NULL,
    horario_codhorario   INTEGER NOT NULL
);

CREATE TABLE cliente (
    codcliente   INTEGER NOT NULL,
    nombres       VARCHAR(200) NOT NULL,
    apellidos     VARCHAR(200) NOT NULL,
    emsil		VARCHAR(300) NOT NULL,
    username     VARCHAR(100) NOT NULL,
    password   VARCHAR(50) NOT NULL
);

ALTER TABLE cliente ADD CONSTRAINT cliente_pk PRIMARY KEY ( codcliente );

CREATE TABLE horario (
    codhorario               INTEGER NOT NULL,
    proveedor_codproveedor   INTEGER NOT NULL,
    fecha                    DATE NOT NULL,
    hora_inicio              TIME NOT NULL,
    hora_fin                 TIME NOT NULL
);

ALTER TABLE horario ADD CONSTRAINT horario_pk PRIMARY KEY ( codhorario );

CREATE TABLE proveedor (
    codproveedor             INTEGER NOT NULL,
    nombres                   VARCHAR(100) NOT NULL,
    apellidos    			 VARCHAR(200) NOT NULL,
    emsil					VARCHAR(300) NOT NULL,
    password               VARCHAR(50) NOT NULL,
    username     			VARCHAR(100) NOT NULL,
    categoria_codcategoria   INTEGER NOT NULL
);

ALTER TABLE proveedor ADD CONSTRAINT proveedor_pk PRIMARY KEY ( codproveedor );

ALTER TABLE cita
    ADD CONSTRAINT cita_cliente_fk FOREIGN KEY ( cliente_codcliente )
        REFERENCES cliente ( codcliente );

ALTER TABLE cita
    ADD CONSTRAINT cita_horario_fk FOREIGN KEY ( horario_codhorario )
        REFERENCES horario ( codhorario );

ALTER TABLE horario
    ADD CONSTRAINT horario_proveedor_fk FOREIGN KEY ( proveedor_codproveedor )
        REFERENCES proveedor ( codproveedor );

ALTER TABLE proveedor
    ADD CONSTRAINT proveedor_categoria_fk FOREIGN KEY ( categoria_codcategoria )
        REFERENCES categoria ( codcategoria );

