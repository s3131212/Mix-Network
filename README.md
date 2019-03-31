# Mix network
A mix network proof of concept.

Description of [Mix network](https://en.wikipedia.org/wiki/Mix_network) from Wikipedia:  
```
Mix networks are routing protocols that create hard-to-trace communications by using a chain of proxy servers known as mixes which take in messages from multiple senders, shuffle them, and send them back out in random order to the next destination (possibly another mix node). This breaks the link between the source of the request and the destination, making it harder for eavesdroppers to trace end-to-end communications. Furthermore, mixes only know the node that it immediately received the message from, and the immediate destination to send the shuffled messages to, making the network resistant to malicious mix nodes.

Each message is encrypted to each proxy using public key cryptography; the resulting encryption is layered like a Russian doll (except that each "doll" is of the same size) with the message as the innermost layer. Each proxy server strips off its own layer of encryption to reveal where to send the message next. If all but one of the proxy servers are compromised by the tracer, untraceability can still be achieved against some weaker adversaries.
```
![Basic decryption mix net](https://upload.wikimedia.org/wikipedia/commons/4/4f/Red_de_mezcla.png)
Made by Primepq at English Wikipedia, CC BY-SA 3.0

## Usage

### Sender
Message is stored in `sender/message.json` and list of proxies are stored in `sender/proxies.json`.
Send message by:
```
node sender/app.js
```

### Proxy
```
node proxy/app.js <port> <privkey.pem>
```


### Recipient
```
node recipient/app.js <privkey.pem>
```

### Create Keys
Though I've upload several pairs of key for demo, you can use following command to create one.
```
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

P.S. DO NOT USE THE KEY PROVIDED IN THE REPO FOR PRODUCTION USE.

# License
Released under MIT License.