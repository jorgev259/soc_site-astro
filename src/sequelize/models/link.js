import { DataTypes } from 'sequelize'
const model = (sequelize) => {
  const Link = sequelize.define('link', {
    url: DataTypes.STRING,
    directUrl: DataTypes.STRING,
    provider: DataTypes.STRING,
    custom: DataTypes.STRING
  })

  return Link
}

export default model
