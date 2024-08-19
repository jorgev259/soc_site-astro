import { DataTypes } from 'sequelize'
import { PLACEHOLDER } from '@/constants'

const model = (sequelize) => {
  const Game = sequelize.define(
    'game',
    {
      slug: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      releaseDate: DataTypes.DATEONLY,
      placeholder: { type: DataTypes.TEXT, defaultValue: PLACEHOLDER },
      headerColor: { type: DataTypes.STRING, defaultValue: '#ffffff' }
    },
    {
      freezeTableName: true
    }
  )

  return Game
}

export default model
