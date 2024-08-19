import { DataTypes } from 'sequelize'
const model = (sequelize) => {
  const Category = sequelize.define(
    'category',
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

  return Category
}

export default model
