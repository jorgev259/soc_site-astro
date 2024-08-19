import { DataTypes } from 'sequelize'

const request = (sequelize) =>
  sequelize.define('request', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    user: DataTypes.STRING,
    userID: DataTypes.STRING,
    state: { type: DataTypes.STRING, allowNull: false },
    donator: { type: DataTypes.BOOLEAN, allowNull: false },
    reason: DataTypes.STRING,
    comments: DataTypes.STRING,
    message: DataTypes.STRING
  })

export default request
