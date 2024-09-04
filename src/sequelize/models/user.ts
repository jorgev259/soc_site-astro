import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from '@sequelize/core'
import { Attribute, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy'

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @Attribute(DataTypes.STRING)
  declare username: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare imgId: string
}