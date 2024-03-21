import { Context, Next } from 'koa';

interface Opts { }

export function realIp(opts?: Opts) {
  return async (ctx: Context, next: Next) => {
    const forwarded = ctx.headers['x-forwarded-for'] || ''
    const ip = (typeof(forwarded) == 'string') ? forwarded.split(',').shift() : forwarded.shift()
    let realIp = (ip || ctx.ip || '').trim()
    if (realIp.startsWith('::ffff:')) realIp = realIp.substring(7)
    ctx.realIp = realIp
    await next()
  }
}