// 这是一个简单的Node.js测试文件

console.log('Hello from Node.js!');
console.log('当前时间是:', new Date().toLocaleString());

// 简单的HTTP服务器示例
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Node.js 测试页面</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
        }
        h1 {
          color: #0066cc;
        }
        .success {
          color: green;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>Node.js 服务器运行成功!</h1>
      <p class="success">恭喜! 如果您看到这个页面，说明您的Node.js环境已经成功安装并运行。</p>
      <p>当前时间: ${new Date().toLocaleString()}</p>
      <p>服务器信息: Node.js ${process.version}</p>
      <hr>
      <p>您可以开始构建您的Node.js应用程序了。</p>
    </body>
    </html>
  `);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}/`);
  console.log('按 Ctrl+C 停止服务器');
});