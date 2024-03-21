import _ from 'lodash'
import { readFileSync } from 'fs'
import { parse } from 'yaml'
import { join } from 'path'

const defaultConfigFile = join(__dirname, '../../../config.yml')

class Config {
  private data: any

  constructor() {
    this.data = parse(readFileSync(defaultConfigFile, 'utf8'))
  }

  public get<T>(path: string, defaultValue?: T) {
    const v = _.get(this.data, path)
    if (!_.isNil(v)) return v as T
    return defaultValue
  }

  public getOrThrow<T>(path: string, defaultValue?: T) {
    const v = this.get(path, defaultValue)
    if (_.isNil(v)) throw new Error(`configuration key ${path} does not exist`)
    return v
  }

  public show() {
    return this.data
  }
}

export const config = new Config()