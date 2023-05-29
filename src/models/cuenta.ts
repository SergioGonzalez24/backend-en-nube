'use strict';

import {Model} from 'sequelize';

interface UserAttributes{
  cuenta_id:number,
  email:string,
  balance:number,
}


module.exports = (sequelize:any, DataTypes:any) => {
  class Cuenta extends Model<UserAttributes> implements UserAttributes {
    cuenta_id!: number;
    balance!: number;
    email!: string;
  }
  Cuenta.init({
    cuenta_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    email: DataTypes.STRING,
    balance: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cuenta',
  });
  return Cuenta;
};