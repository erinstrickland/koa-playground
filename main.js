const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')

const app = new Koa()
const router = new Router()
let studentArray = [{firstName:"Erin", lastName: "Strickland", grade: "A"},
  {firstName:"Patrick", lastName: "Skiba", grade: "F"},
  {firstName:"Pete", lastName: "Strickland", grade: "B"},
  {firstName:"Chumbies", lastName: "Pelletier", grade: "C"},
  {firstName:"Ass", lastName: "Ketchum", grade: "D"}]

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = studentArray
})

router.get('/lastname/:lastName', (ctx, next) => {
  const info = studentArray.find(student => ctx.params.lastName === student.lastName)
  if (info.grade === 'C' || info.grade === 'B' || info.grade === 'A') {
    ctx.body = `First Name: ${info.firstName} \nLast Name: ${info.lastName} \nGrade: ${info.grade} \nStudent is passing`
  }
  else ctx.body = `First Name: ${info.firstName} \nLast Name: ${info.lastName} \nGrade: ${info.grade} \nStudent is failing` 
})

router.get('/grade/:grade', (ctx, next) => {
  ctx.body = studentArray.filter(student => ctx.params.grade === student.grade)
})

router.post('/', (ctx, next) => {
  studentArray.push(JSON.parse(ctx.request.body))
})

router.get('/name', (ctx, next) => {
  ctx.body = studentArray.map(student => student.firstName + ' ' + student.lastName)
})

router.get('/passing', (ctx, next) => {
  ctx.body = studentArray.filter(student => student.grade === 'C' || student.grade === 'B' || student.grade === 'A')
})

app.use(koaBody())

app
  .use(router.routes())
  .use(router.allowedMethods())

  app.listen(3000) 