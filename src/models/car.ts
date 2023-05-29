'use strict';

import { Model } from 'sequelize';

interface CarAttributes {
  color: string,
  brand: string,
  year: number}


module.exports = (sequelize: any, DataTypes: any) => {
  class Car extends Model implements CarAttributes {
    color!: string;
    brand!: string;
    year!: number;

    static associate(models: any) {
      // define association here
    }
  }
  Car.init({
    color: DataTypes.STRING,
    brand: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};