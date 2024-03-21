import { Table, Column, DataType } from 'sequelize-typescript'
import BaseModel from './base'

@Table({
  tableName: 'merkle_tree',
  indexes: [
    { name: 'address', fields: ['address'], unique: true }
  ]
})
export class MerkleTreeModel extends BaseModel {
  @Column({
    allowNull: false,
    defaultValue: 0
  })
  declare treeId: number

  @Column({
    allowNull: false,
    defaultValue: 0
  })
  declare index: number

  @Column({
    allowNull: false,
    type: DataType.STRING(64)
  })
  declare address: string

  @Column({
    type: DataType.STRING(72)
  })
  declare root: string

  @Column({
    type: DataType.TEXT
  })
  declare proof: string
}