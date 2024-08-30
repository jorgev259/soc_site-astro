import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes, type NonAttribute } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, BelongsToMany, Table, NotNull, HasMany } from '@sequelize/core/decorators-legacy';

import Album from './album';

@Table({ freezeTableName: true })
export default class Artist extends Model<InferAttributes<Artist>, InferCreationAttributes<Artist>> {
  @PrimaryKey
  @Attribute(DataTypes.STRING)
  declare slug: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string
}
