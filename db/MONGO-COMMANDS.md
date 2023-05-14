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

db.places.insertOne({name: "Explore The World", price: 40, isSeason: true, imgUrl: "/img/places/exploreTheWorld.jpeg"});
db.places.insertOne({name: "Wild Forest", price: 33, isSeason: true, imgUrl: "/img/places/wildForest.jpeg"});
db.places.insertOne({name: "Sunny Beach", price: 120, isSeason: true, imgUrl: "/img/places/sunnyBeach.jpeg"});
db.places.insertOne({name: "City on Winter", price: 120, isSeason: true, imgUrl: "/img/places/citOnWinter.jpeg"});
db.places.insertOne({name: "Mountains", price: 120, isSeason: true, imgUrl: "/img/places/mountains.jpeg"});

db.places.find();
```

### Users & WishList
```
db.users.drop();

db.users.insertOne({username: "kostia", wishList: ["6460bfb2dcf02fa69e0e9330", "6460bfb2dcf02fa69e0e9331"]});

db.users.find();
```
5. Exit mongo shell
```
exit
```

# Official documentation
For more details check [MongoDB CRUD Operations](https://www.mongodb.com/docs/v6.0/crud/)