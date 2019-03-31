var net = require('net');
var fs = require('fs');
var crypto = require('../crypto.js')
var client = new net.Socket();
var mix_amount = 3;

var proxies = JSON.parse(fs.readFileSync(__dirname + '/proxies.json', 'utf8'));
var message_json = JSON.parse(fs.readFileSync(__dirname + '/message.json', 'utf8'));

var message = message_json.message;


//Mix it!

var used_proxies = [];
for(var i=0; i < mix_amount; i++){
	used_proxies[i] = proxies[Math.floor(Math.random() * proxies.length)];
}

console.log(used_proxies);

message = crypto.encryptStringWithRsaPublicKey(JSON.stringify({
			'message_content': message,
			'rand': crypto.randomBytes(256 + Math.floor(Math.random() * Math.floor(20))).toString('hex'),
		}), message_json.recipient.pubkey);

//Encrypt it backwards

for(var i = mix_amount - 1; i >= 0; i--){
	console.log(i);
	if( i == mix_amount - 1 ){
		var recipient = {
			"address": message_json.recipient.address,
			"port":  message_json.recipient.port
		};
		var pubkey = used_proxies[i].pubkey;
	}else{
		var recipient = {
			"address": used_proxies[i+1].address,
			"port":  used_proxies[i+1].port
		};
		var pubkey = used_proxies[i].pubkey;
	}

	message = crypto.encryptStringWithRsaPublicKey(JSON.stringify({
				'message_content': message,
				'rand': crypto.randomBytes(256 + Math.floor(Math.random() * Math.floor(20))).toString('hex'),
				'recipient': recipient
			}), pubkey);
}

client.connect(used_proxies[0].port, used_proxies[0].address, function() {
	console.log('Sent:' + message);
	client.write(message);
});

client.on('close', function() {
	console.log('Connection closed');
});

client.on('error', function(err) {
   console.log(err)
})