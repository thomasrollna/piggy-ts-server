import koaBody from 'koa-body'

export function body() {
  return koaBody({
    includeUnparsed: true,
    multipart: true,
    formidable: {
      maxFieldsSize: 10 * 1024 * 1024,
    },
  })
}