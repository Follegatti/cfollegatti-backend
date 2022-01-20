CREATE DATABASE prueba;

-- -----------------------------------------------------
-- Table "CLIENTES"
-- -----------------------------------------------------
CREATE TABLE  CUSTOMER(
  "id" SERIAL NOT NULL,
  "name" VARCHAR(40) NULL,
  "birthday" TIMESTAMP NULL,
  PRIMARY KEY ("id"));

-- -----------------------------------------------------
-- Table "RESERVACIONES"
-- -----------------------------------------------------
CREATE TABLE  RESERVATION(
  "id" SERIAL NOT NULL,
  "id_customer" INT NOT NULL,
  "location" VARCHAR(40) NULL,
  "reservationDate" DATE NULL,
  "startHour" TIME NULL,
  "endHour" TIME NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_RESERVA_CUSTOMER1"
    FOREIGN KEY ("id_customer")
    REFERENCES CUSTOMER ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);