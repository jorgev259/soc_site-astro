import { DataTypes } from 'sequelize'

const model = (sequelize) => {
  const Artist = sequelize.define(
    'artist',
    {
      slug: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  )
  return Artist
}

export default model
