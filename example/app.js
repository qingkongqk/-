// 引入服务器
let { createServer } = require('http');
// 进入fs模块
let { exists, readFile } = require('fs');
// 引入path
let { join, parse, extname } = require('path');
let url = require('url');
let queryString = require('querystring');

// 获取指令执行的根目录
let root = process.cwd();

// 文档类型
let MINE_TYPES = {
	'html': 	'text/html',
	'xml': 		'text/xml',
	'txt': 		'text/plain',
	'css': 		'text/css',
	'js': 		'text/javascript',
	'json': 	'application/json',
	'pdf': 		'application/pdf',
	'swf': 		'application/x-shockwave-flash',
	'svg': 		'image/svg+xml',
	'tiff': 	'image/tiff',
	'png': 		'image/png',
	'gif': 		'image/gif',
	'ico': 		'image/x-icon',
	'jpg': 		'image/jpeg',
	'jpeg': 	'image/jpeg',
	'wav': 		'audio/x-wav',
	'wma': 		'audio/x-ms-wma',
	'wmv': 		'video/x-ms-wmv',
	'woff2': 	'application/font-woff2'
};

// 用户提交的消息
let data = ['hello'];

// 创建服务器
let server = createServer(async (req, res) => {
    
    // 将url中的中文解码
    let reqUrl = decodeURIComponent(req.url);
    // console.log(req.url)
    // 文件的路径
    let path = join(root, reqUrl);
    // console.log(path, reqUrl, '.' + reqUrl)
    // 如果没有拓展名，说明是目录，设置默认文件：index.html
    if (!extname(path)) {
        // 添加默认文件
        path = join(path, 'index.html')
    }
    // 解析路径
    let obj = parse(path);
    // 根据URL寻找文件
    let isExists = await new Promise((resolve, reject) => {
        // 判断文件是否存在
        exists(path, isExists => {
            // 如果存在
            // 返回结果
            resolve(isExists)
        })
    })
    // 如果文件存在，返回文件
    if (isExists) {
        let data = await new Promise((resolve, reject) => {
            // 读取文件
            readFile(path, (err, data) => {
                resolve(data)
            })
        })
        // 如果有数据
        if (data) {
            // 设置编码  res.setHeader, res.writeHead
            res.setHeader('Content-Type', (MINE_TYPES[obj.ext.slice(1)] || MINE_TYPES.txt) + ';charset=utf-8')
            // 返回数据
            res.end(data);
        } else {
            // 提示
            res.writeHead(404, {
                "Content-Type": MINE_TYPES.txt + ';charset=utf-8'
            })
            res.end(reqUrl+ ' not found!')
        }
    } else {
        // 如果文件不存在提示错误
        // 提示
        res.writeHead(404, {
            "Content-Type": MINE_TYPES.txt + ';charset=utf-8'
        })
        res.end(reqUrl + ' not found!')
    }
})

// 监听端口号
server.listen(3000, () => console.log('http port listen at 3000'))