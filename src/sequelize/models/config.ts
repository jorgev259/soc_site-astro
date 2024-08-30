import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, Table } from '@sequelize/core/decorators-legacy';

@Table({
  freezeTableName: true,
})
export default class Config extends Model<InferAttributes<Config>, InferCreationAttributes<Config>> {
  @Attribute(DataTypes.STRING)
  @PrimaryKey
  declare name: string

  @Attribute(DataTypes.STRING)
  declare value: string
}

