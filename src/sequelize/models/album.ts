import { DataTypes, Model, type BelongsToManyGetAssociationsMixin, type CreationOptional, type InferAttributes, type InferCreationAttributes, type NonAttribute } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, Default, BelongsToMany } from '@sequelize/core/decorators-legacy';

import Category from './category';
import Artist from './artist';

export default class Album extends Model<InferAttributes<Album>, InferCreationAttributes<Album>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.STRING)
  declare title: string

  @Attribute(DataTypes.TEXT)
  declare subTitle: string

  @Attribute(DataTypes.DATEONLY)
  declare releaseDate: string

  @Attribute(DataTypes.STRING)
  declare label: string

  @Attribute(DataTypes.STRING)
  declare vgmdb: string

  @Attribute(DataTypes.STRING)
  declare description: string

  @Attribute(DataTypes.ENUM('show', 'hidden', 'coming'))
  @Default('hidden')
  declare status: CreationOptional<string>

  @Attribute(DataTypes.STRING)
  @Default('#ff7c12')
  declare headerColor: CreationOptional<string>

  @BelongsToMany(() => Category, { through: 'Album_Category', foreignKey: { onDelete: 'SET NULL' } })
  declare categories?: NonAttribute<Category[]>

  @BelongsToMany(() => Artist, { through: 'Album_Artist', foreignKey: { onDelete: 'SET NULL' } })
  declare artists?: NonAttribute<Artist[]>

  declare getArtists: BelongsToManyGetAssociationsMixin<Artist>
}

