import Joi from 'joi'
import { Route } from '@lib/interfaces'
import { RequestMethod } from '@lib/enums'
import { api } from '@controller/api'

const prefix = '/api'

const routes: Route[] = [
  {
    name: 'get proof',
    path: '/proof',
    method: RequestMethod.GET,
    params: Joi.object({
      address: Joi
        .string()
        .required()
    }),
    action: api.apiController.getProof
  }
]

export const apiRoutes = routes.map((item) => ({ ...item, path: `${prefix}${item.path}` }))