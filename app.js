

var Koa = require('koa')
var Router = require('koa-router')

var app = new Koa()


require('./todo')

var router = new Router()

router.get('/', async (ctx) => {
    ctx.response.body = 'Home'
})

router.get('/todo', async (ctx) => {
    ctx.response.body = 'Todo'
})

app.use(router.routes())





app.listen(3000)