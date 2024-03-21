import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import { Dialect } from 'sequelize'

export function createDatabase(options: {
  dialect: Dialect
  host: string,
  port: number,
  database: string,
  username: string,
  password: string
}) {
  return new Sequelize({
    ...options,

    models: [path.join(__dirname, `../../model/**/*.model.js`)],
    modelMatch: (filename, member) => {
      const name = filename.replace('.model', '_model')
      const model = member
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .substring(1)
      return name === model
    },

    define: {
      timestamps: true,
      paranoid: false,
      underscored: true,
      charset: 'utf8'
    },

    pool: {
      max: 15,
      min: 2,
      acquire: 60000,
      idle: 60000,
    },

    dialectOptions: {
      decimalNumbers: true,
      maxPreparedStatements: 100,
      connectTimeout: 60000
    },

    timezone: '+08:00',
    repositoryMode: true,
    logging: false,
  })
}