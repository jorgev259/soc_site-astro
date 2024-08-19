import { DataTypes } from 'sequelize'
const model = (sequelize) => {
  const Classification = sequelize.define(
    'classification',
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    {
      freezeTableName: true
    }
  )

  return Classification
}

export default model
