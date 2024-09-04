import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, Table } from '@sequelize/core/decorators-legacy';

@Table({ tableName: 'config' })
export default class Config extends Model<InferAttributes<Config>, InferCreationAttributes<Config>> {
  @Attribute(DataTypes.ENUM('banner', 'banner-position'))
  @PrimaryKey
  declare name: string

  @Attribute(DataTypes.STRING)
  declare value: string
}

