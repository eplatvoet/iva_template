// THIS IS TO VIEW CHAPTER VIDEO FUNCTIONALTIY LOCALLY
// USE localhost TO PREVIEW INSTEAD OF PHP

var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

var root = path.resolve(__dirname, 'build');
var port = Number(process.env.PORT) || 8081;
var contentTypes = {
	'.css': 'text/css; charset=utf-8',
	'.html': 'text/html; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.mp4': 'video/mp4',
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2'
};

http.createServer(function (request, response) {
	var pathname;
	try {
		pathname = decodeURIComponent(url.parse(request.url).pathname);
	} catch (error) {
		response.writeHead(400).end('Bad request');
		return;
	}

	var filePath = path.resolve(root, '.' + pathname);
	if (filePath !== root && filePath.indexOf(root + path.sep) !== 0) {
		response.writeHead(403).end('Forbidden');
		return;
	}
	if (filePath === root || pathname.charAt(pathname.length - 1) === '/') {
		filePath = path.join(filePath, 'index.html');
	}

	fs.stat(filePath, function (error, stats) {
		if (error || !stats.isFile()) {
			response.writeHead(404).end('Not found');
			return;
		}

		var headers = {
			'Accept-Ranges': 'bytes',
			'Content-Type': contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
		};
		var range = request.headers.range;
		var start = 0;
		var end = stats.size - 1;
		var statusCode = 200;

		if (range) {
			var match = /^bytes=(\d*)-(\d*)$/.exec(range);
			if (!match || (!match[1] && !match[2])) {
				response.writeHead(416, { 'Content-Range': 'bytes */' + stats.size }).end();
				return;
			}
			if (!match[1]) {
				var suffixLength = Number(match[2]);
				start = Math.max(stats.size - suffixLength, 0);
			} else {
				start = Number(match[1]);
				if (match[2]) end = Math.min(Number(match[2]), end);
			}
			if (start >= stats.size || start > end) {
				response.writeHead(416, { 'Content-Range': 'bytes */' + stats.size }).end();
				return;
			}
			statusCode = 206;
			headers['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stats.size;
		}

		headers['Content-Length'] = end - start + 1;
		response.writeHead(statusCode, headers);
		if (request.method === 'HEAD') {
			response.end();
			return;
		}
		fs.createReadStream(filePath, { start: start, end: end }).pipe(response);
	});
}).listen(port, function () {
	console.log('Preview server listening at http://localhost:' + port);
});