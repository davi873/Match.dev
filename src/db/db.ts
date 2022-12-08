import { Sequelize } from 'sequelize-typescript'
import { SimplesNacionalRepository } from '../repositories/implementations/SimplesNacionalRepository'
import UserRepository from '../repositories/implementations/UserRepository'
console.log('DIRNAME', __dirname + '../entities/*.ts')

//Update Match Dev
const database: Sequelize  = new Sequelize({
    dialect: 'sqlite',
    database: process.env.DATABASE,
    port: parseInt(process.env.PORT_DATABASE),
    storage: './sqlite/simples_db.sqlite'
})
database.addModels([SimplesNacionalRepository, UserRepository])
database.sync({force:false})
export default database

