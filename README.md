# Detroit SDK for JS

## Version 0.0.1

This library is extremely alpha, does not yet even properly declare dependencies. **beware**.

```
const DetroitApiClient = require('./src/DetroitApiClient');
const client = new DetroitApiClient();

client.waste("1465 Chicago").then(req => console.log(req));
client.parcelNumber("1465 Chicago").then(req => console.log(req));
client.permits("11619 Kentucky").then(req => console.log(req));
client.blightTickets("1465 Chicago").then(req => console.log(req));
```
