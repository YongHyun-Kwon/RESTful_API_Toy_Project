// @ts-check

// framework 없이 간단한 toyproject 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 *  - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 *  - 인증 로직은 넣지 않는다.
 *  - RESful API를 사용한다.
 *  - Postman을 사용하여 로직 확인
 */
const http = require('http')

const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url && _route.url.test(req.url) && _route.method === req.method
    )

    if (!route) {
      res.statusCode = 404
      res.end('Not found.')
      return
    }

    const result = await route.callback()
    res.statusCode = result.statusCode

    if (result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8 ')
      res.end(JSON.stringify(result.body))
    }
  }
  main()
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port : ${PORT}`)
})
