import { DataTypes } from 'sequelize'

const model = (sequelize) =>
  sequelize.define('submission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    title: DataTypes.STRING,
    vgmdb: {
      type: DataTypes.STRING,
      allowNull: true
    },
    links: DataTypes.TEXT,
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })

export default model
