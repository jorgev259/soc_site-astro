import { DataTypes } from '@/sequelize'
const model = (sequelize) => {
  const Download = sequelize.define('download', {
    title: DataTypes.STRING,
    small: DataTypes.BOOLEAN
  })

  return Download
}

export default model
