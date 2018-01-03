# Detroit SDK for JS

## Version 0.0.1

This library is extremely alpha, does not yet even properly declare dependencies. **beware**.

```
const DetroitApiClient = require('./src/DetroitApiClient');
const client = new DetroitApiClient();
```

---

### Parcel Number
```
client.parcelNumber("1465 Chicago").then(req => console.log(req));
```
---

### Waste
#### params
- address
- type client.trashType RECYCLING, TRASH, YARD, ALL, BULK
Defaults to trash
```
client.waste("1465 Chicago Blvd", client.trashType.RECYCLING).then(response => console.log(response));
```
---

### Permits
#### params
- address
- status ["CLOSED", "OPEN", "EXPIRED", "ALL"] defaults to "OPEN"

```
client.permits("555 Fake street", "OPEN").then(req => console.log(req));
```
#### response

`Returns object {"address": "555 Fake street", "permits": []}`

---

### Blight
```
client.blightTickets("1465 Chicago").then(req => console.log(req));
```
---

### Demolitions
Demolitions returns an array of demos surrounding the given point.
The default range is 200 meters if none is supplied.
Location currently only supports an object with `lat/lon`

TODO: Limit by date

Get location by lat long
```
client.demolitions({'location':{'lat': 42.381274,'long': -83.096931}}).then(req => console.log(req))
```

Get location by Address
```
client.demolitions({'address': '1465 Chicago Blvd'}).then(req => console.log(req))
```

```
client.demolitions({'location':{'lat': 42.381274,'long': -83.096931}}, 500).then(req => console.log(req))

client.demolitions({'location':{'lat': 42.381274,'long': -83.096931}}, 600).then(response => {
  const data = response;
  console.log(`There are ${data.length} demolitions planned within the target area.`)
});
```

Example Response
```
[{ address: '1610 Burlingame',
    commercial_building: 'No',
    contractor_name: 'Den-Man Contractors',
    council_district: '5',
    demolish_by_date: '2018-03-06T00:00:00.000',
    latitude: '42.386772',
    location: { type: 'Point', coordinates: [Array] },
    location_address: 'location',
    longitude: '-83.103285',
    neighborhood: 'Dexter-Linwood',
    parcel_id: '06003088.',
    price: '23240' }]
```
