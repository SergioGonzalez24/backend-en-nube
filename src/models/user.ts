'use strict';

import {Model} from 'sequelize';

interface UserAttributes{
  awsCognitoId:string,
  name:string,
  role:string,
  email:string
}

export enum UserRoles{
  ADMIN = 'ADMIN',
  AGENT = "AGENT",
  CUSTOMER = "CUSTOMER"
}

module.exports = (sequelize:any, DataTypes:any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    awsCognitoId!: string;
    name!: string;
    role!: string;
    email!: string;
  }
  User.init({
    awsCognitoId:{
      type: DataTypes.STRING,
      allowNull:false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:UserRoles.CUSTOMER
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};