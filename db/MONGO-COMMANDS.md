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

db.places.insertOne({name: "Explore The World", price: 40, isSeason: true, imgUrl: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"});
db.places.insertOne({name: "Wild Forest", price: 33, isSeason: true, imgUrl: "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"});
db.places.insertOne({name: "Sunny Beach", price: 120, isSeason: true, imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"});
db.places.insertOne({name: "City on Winter", price: 120, isSeason: true, imgUrl: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"});
db.places.insertOne({name: "Mountains", price: 120, isSeason: true, imgUrl: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"});

db.places.find();
```

### Users & WishList
```
db.users.drop();

db.users.insertOne({username: "kostia", wishList: ["6458ab55a8d97209e31dd0c3", "6458aba8a8d97209e31dd0c5"]});

db.users.find();
```
5. Exit mongo shell
```
exit
```

# Official documentation
For more details check [MongoDB CRUD Operations](https://www.mongodb.com/docs/v6.0/crud/)