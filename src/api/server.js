const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Bắt buộc thêm cấu hình CORS này trước khi dùng middlewares và router
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // Cho phép tất cả các domain, bao gồm daohere.vercel.app
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  
  // Xử lý các request OPTIONS (Preflight request) từ trình duyệt
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

server.use(middlewares)
server.use(router)

module.exports = server
