# Detroit SDK for JS

## Version 0.0.1

This library is extremely alpha, does not yet even properly declare dependencies. **beware**.

```
const DetroitApiClient = require('./src/DetroitApiClient');
const client = new DetroitApiClient();

```

## Parcel Number
```
client.parcelNumber("1465 Chicago").then(req => console.log(req));
```

## WASTE
```
client.waste("1465 Chicago").then(req => console.log(req));
```

## Permits
```
client.permits("11619 Kentucky").then(req => console.log(req));
```

## Blight
```
client.blightTickets("1465 Chicago").then(req => console.log(req));
```

## Demolitions
Demolitions returns an array of demos surrounding the given point.
The default range is 200 meters if none is supplied.
Location currently only supports an object with `lat/lon`

TODO: Limit by date

```
client.demolitions({lat: 42.417445,lon: -83.042118}).then(req => console.log(req))

client.demolitions({lat: 42.417445,lon: -83.042118}, 500).then(req => console.log(req))

client.demolitions({lat: 42.417445,lon: -83.042118}, 600).then(response => {
  const data = response;
  console.log(`There are ${data.length} demolitions planned within the target area.`)
});
```
