-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Playa_estacionamiento
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Playa_estacionamiento
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Playa_estacionamiento` DEFAULT CHARACTER SET utf8 ;
USE `Playa_estacionamiento` ;

-- -----------------------------------------------------
-- Table `Playa_estacionamiento`.`t_vehiculo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Playa_estacionamiento`.`t_vehiculo` (
  `veh_id` INT NOT NULL AUTO_INCREMENT,
  `veh_placa` VARCHAR(8) NULL,
  `veh_marca` VARCHAR(25) NULL,
  `veh_anio` YEAR NULL,
  `veh_modelo` VARCHAR(15) NULL,
  `veh_color` VARCHAR(15) NULL,
  PRIMARY KEY (`veh_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Playa_estacionamiento`.`t_playa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Playa_estacionamiento`.`t_playa` (
  `playa_id` INT NOT NULL AUTO_INCREMENT,
  `playa_nomb` VARCHAR(45) NULL,
  `playa_capacidad` INT NULL,
  PRIMARY KEY (`playa_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Playa_estacionamiento`.`t_registro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Playa_estacionamiento`.`t_registro` (
  `reg_id` INT NOT NULL AUTO_INCREMENT,
  `reg_fechin` DATETIME NULL,
  `reg_fechfin` DATETIME NULL,
  `reg_monto` DECIMAL(5,2) NULL,
  `veh_id` INT NOT NULL,
  `playa_id` INT NOT NULL,
  PRIMARY KEY (`reg_id`),
  INDEX `fk_t_registro_t_vehiculo_idx` (`veh_id` ASC) VISIBLE,
  INDEX `fk_t_registro_t_playa1_idx` (`playa_id` ASC) VISIBLE,
  CONSTRAINT `fk_t_registro_t_vehiculo`
    FOREIGN KEY (`veh_id`)
    REFERENCES `Playa_estacionamiento`.`t_vehiculo` (`veh_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_registro_t_playa1`
    FOREIGN KEY (`playa_id`)
    REFERENCES `Playa_estacionamiento`.`t_playa` (`playa_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
