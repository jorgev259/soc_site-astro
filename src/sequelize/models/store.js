import { DataTypes } from '@/sequelize'
const model = (sequelize) => {
  const Store = sequelize.define('store', {
    url: DataTypes.STRING,
    provider: DataTypes.STRING
  })
  return Store
}

export default model
