import { DataTypes } from 'sequelize'
import { PLACEHOLDER } from 'constants'

const model = (sequelize) => {
  const Series = sequelize.define(
    'series',
    {
      slug: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: { type: DataTypes.STRING },
      placeholder: { type: DataTypes.TEXT, defaultValue: PLACEHOLDER },
      headerColor: { type: DataTypes.STRING, defaultValue: '#ffffff' }
    },
    {
      freezeTableName: true
    }
  )

  return Series
}

export default model
