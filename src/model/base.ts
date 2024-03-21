import { Model } from 'sequelize-typescript'

export default class BaseModel extends Model {

  public serializer(opts?: { exclude?: string[] }) {
    const { exclude } = opts || {}
    const entity: any = this.toJSON()

    if (exclude)
      exclude.forEach(key => delete entity[key])

    return entity
  }
}