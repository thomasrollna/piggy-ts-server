import _ from 'lodash'
import BaseService from './base'
import { Exception } from '@lib/interfaces'
import { Code } from '@lib/enums'
import { merkleTreeRepository } from '@model/index'
import { utils } from 'ethers'

class ApiService extends BaseService {

  public async getProof(params: any) {
    const { address } = params
    const row = await merkleTreeRepository.findOne({
      where: {
        address: utils.getAddress(address)
      }
    })
    if (!row) throw new Exception(Code.INVALID_ID, "invalid address")
    return {
      index: row.index,
      address: row.address,
      root: row.root,
      proof: JSON.parse(row.proof)
    }
  }
}

export const apiService = new ApiService()