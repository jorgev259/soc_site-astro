import { DataTypes } from '@/sequelize'
const model = (sequelize) => {
  const Publisher = sequelize.define(
    'publisher',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true
    }
  )

  return Publisher
}

export default model
