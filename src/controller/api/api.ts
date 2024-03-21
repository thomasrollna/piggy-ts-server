import _ from 'lodash'
import { Context } from 'koa'
import BaseController from '../base'
import { apiService } from '@service/index'

class ApiController extends BaseController {

  public getProof(ctx: Context) {
    return apiService.getProof(ctx.params)
  }
}

export const apiController = new ApiController()