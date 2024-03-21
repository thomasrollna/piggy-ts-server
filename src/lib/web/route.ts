import Router from 'koa-router'
import { paramValidate } from './param_validate'
import { response } from './response'

export const handleRouter = (routes: any[], server: 'admin' | 'api'): Router => {
  const router = new Router()
  routes.forEach((item) => {
    const { name, path, method, action, middlewares = [], params: schema, isSkip, isAttachment = false } = item
    if (!isSkip) {
      if (isAttachment) {
        // @ts-ignore
        router[method](name, path, ...middlewares, paramValidate({ schema }), action)
      } else {
        // @ts-ignore
        router[method](name, path, ...middlewares, paramValidate({ schema }), response({ action, server }))
      }
    }
  })
  return router
}