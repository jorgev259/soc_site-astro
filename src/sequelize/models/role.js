import { DataTypes } from 'sequelize'
const model = (sequelize) => {
  const Role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    permissions: DataTypes.JSON
  })

  return Role
}

export default model
