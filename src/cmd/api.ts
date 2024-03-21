require('module-alias/register')
import os from 'os'
import Koa from 'koa'
import http from 'http'
import { handleRouter, realIp } from '@lib/web'
import { apiRoutes } from '@route/index'
import { cors, body } from '@lib/web'
import { config } from '@lib/config'

const API_PORT = config.getOrThrow<number>('api.port')

const app = new Koa()
app.keys = ['40a7522c-c862-48c7-a39c-723f631b2e8b']
app.use(realIp())
app.use(body())
app.use(cors())
app.use(handleRouter([ ...apiRoutes ], 'api').routes())

const server = http.createServer(app.callback())
server.keepAliveTimeout = 0
server.headersTimeout = 0
server.listen(API_PORT, 65535, () => {
  console.log(`api server start, hostname: ${os.hostname()}, port: ${API_PORT}`)
})