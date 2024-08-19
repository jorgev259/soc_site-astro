import { DataTypes } from 'sequelize'
const model = (sequelize) => {
  const Disc = sequelize.define('disc', {
    number: DataTypes.INTEGER,
    body: DataTypes.TEXT
  })

  return Disc
}

export default model
