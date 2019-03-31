var net = require('net');
var crypto = require('../crypto.js');

var port = process.argv[2];
var privkey = process.argv[3];

var server = net.createServer(function(socket) {
	socket.on('data', function(data){
		textChunk = data.toString('utf8');
		console.log('Message recieved: ' + textChunk);

		//textChunk = JSON.parse(textChunk);

		var message = crypto.decryptStringWithRsaPrivateKey(textChunk, privkey);
		console.log('Message decrypted: ' + message);

		message = JSON.parse(message);
		console.log('Message parsed: ' + message.message_content);
	});
	socket.pipe(socket);
});

server.listen(port, '127.0.0.1');