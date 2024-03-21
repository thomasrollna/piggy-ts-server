import { createDatabase } from '@lib/db'
import { config } from '@lib/config'
import { Dialect } from 'sequelize'
import { MerkleTreeModel } from './merkle_tree.model'

const db = createDatabase({
  dialect: config.getOrThrow<Dialect>('db.dialect'),
  host: config.getOrThrow<string>('db.host'),
  port: config.getOrThrow<number>('db.port'),
  database: config.getOrThrow<string>('db.database'),
  username: config.getOrThrow<string>('db.username'),
  password: config.getOrThrow<string>('db.password')
})

const merkleTreeRepository = db.getRepository(MerkleTreeModel)

export {
  db,
  merkleTreeRepository
}