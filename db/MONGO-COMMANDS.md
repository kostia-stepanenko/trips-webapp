# Working with local MongoDB

1. Connect to running MongoDB instance
```
./client.sh
```

2. switch to test DB 
```
use test;
```

3. Show all collections (tables)
```
show collections;
```

4. Insert some data

### Places
```
db.places.drop();

db.places.insertOne({_id: ObjectId("000000000000000000000001"), name: "Explore The World", price: 40, isSeason: true, imgUrl: "/img/places/exploreTheWorld.jpeg"});
db.places.insertOne({_id: ObjectId("000000000000000000000002"), name: "Wild Forest", price: 33, isSeason: true, imgUrl: "/img/places/wildForest.jpeg"});
db.places.insertOne({_id: ObjectId("000000000000000000000003"), name: "Sunny Beach", price: 120, isSeason: true, imgUrl: "/img/places/sunnyBeach.jpeg"});
db.places.insertOne({_id: ObjectId("000000000000000000000004"), name: "City on Winter", price: 120, isSeason: true, imgUrl: "/img/places/cityOnWinter.jpeg"});
db.places.insertOne({_id: ObjectId("000000000000000000000005"), name: "Mountains", price: 120, isSeason: true, imgUrl: "/img/places/mountains.jpeg"});


db.places.find();
```

### Users & WishList
```
db.users.drop();

db.users.insertOne({username: "kostia", password: "kostia", wishList: ["000000000000000000000001", "000000000000000000000002"]});
db.users.insertOne({username: "olesia", password: "olesia", wishList: ["000000000000000000000005"]});

db.users.find();
```
5. Exit mongo shell
```
exit
```

# Official documentation
For more details check [MongoDB CRUD Operations](https://www.mongodb.com/docs/v6.0/crud/)