import { DataTypes } from '@/sequelize'
const model = (sequelize) => {
  const Platform = sequelize.define(
    'platform',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: 'Game'
      }
    },
    {
      freezeTableName: true
    }
  )

  return Platform
}

export default model
