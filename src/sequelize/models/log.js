import { DataTypes } from '@/sequelize'
const model = (sequelize) => {
  return sequelize.define('log', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    action: DataTypes.STRING,
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  })
}

export default model
