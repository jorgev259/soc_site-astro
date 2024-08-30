import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from '@sequelize/core';
import { Attribute, PrimaryKey, Table } from '@sequelize/core/decorators-legacy';

@Table({ freezeTableName: true })
export default class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  @PrimaryKey
  @Attribute(DataTypes.STRING)
  declare name: string
}

