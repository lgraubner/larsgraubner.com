---
categories: ['Node.js']
title: Query a domain registrar via WHOIS with Node.js
date: 2021-09-04
description: Every domain registrar is obliged to provide an API with the WHOIS protocol to query for domain information. This can be done with Node.js.
---

Every domain registrar is obliged to provide an API with the WHOIS protocol to query for domain information. Per specification ([RFC 3912](https://datatracker.ietf.org/doc/html/rfc3912)) the service has to be operated under port 43.

The following Node.js script helps to make a simple query to a specified registrars WHOIS API. It appends the required new line, connects to TCP port 43 via socket and returns the data.

```js
const net = require('net');

function whois(query, host) {
    let data = '';

    let socket = net.connect({ host, port: 43 }, () => {
        socket.write(query + '\r\n');
    });
    socket.setTimeout(15000);

    socket.on('data', (chunk) => (data += chunk));
    socket.on('close', () => resolve(data));

    socket.on('timeout', () => {
        socket.destroy(new Error('Timeout'));
    });
    socket.on('error', reject);
}
```

This can be used as followed:

```js
let response = await whois('mydomain.de', 'whois.denic.de');
```

The response format is specified by [RFC 2167](https://datatracker.ietf.org/doc/html/rfc2167), but varies more or less depending on the registar. Therefore it's quite hard to parse the response in a standardized way. Also the amount of information varies a lot. Anyway this little function may be useful sometimes.
