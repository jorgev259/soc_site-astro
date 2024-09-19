import { DataTypes } from 'sequelize'
import { PLACEHOLDER } from 'constants'

const animation = (sequelize) => {
  sequelize.define(
    'animation',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: { type: DataTypes.STRING, unique: true },
      subTitle: { type: DataTypes.STRING },
      releaseDate: DataTypes.DATEONLY,
      placeholder: { type: DataTypes.TEXT, defaultValue: PLACEHOLDER },
      headerColor: { type: DataTypes.STRING, defaultValue: '#ffffff' }
    },
    { freezeTableName: true }
  )

  sequelize.define(
    'studio',
    {
      slug: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: DataTypes.STRING
    },
    { freezeTableName: true }
  )
}

export default animation
