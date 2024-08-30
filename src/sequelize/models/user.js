import { DataTypes } from '@/sequelize'

const model = (sequelize) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    placeholder: { type: DataTypes.TEXT },
    imgId: DataTypes.STRING
  })

  sequelize.define('forgor', {
    key: { type: DataTypes.STRING, primaryKey: true },
    expires: DataTypes.DATE
  })

  return User
}

export default model
