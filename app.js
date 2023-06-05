const express = require("express");
const conn = require("./connect");
const mongodb = require("mongodb");
const app = express();

app.use(express.json());

///**mongodb and test API with postman */

//read(GET) data from database

app.get("/", async (req, res) => {
  const data = await conn();
  const result = await data.find().toArray();
  console.log(result);
  res.send(result);
});

//create/insert(POST) data in database from postman
app.post("/", async (req, res) => {
  const data = await conn();
  const result = await data.insertOne(req.body);
  // console.log(result);
  // res.send(result);
  console.log(req.body);
  res.send(req.body);
});
//update(PUT) data in database with the help of postman
app.put("/", async (req, res) => {
  let data = await conn();
  //static data
  // let result = await data.updateOne({ name: "kavya" }, { $set: { age: 35 } });

  //dynamic data(data come from postman)
  let result = await data.updateOne({ age: req.body.age }, { $set: req.body });
  console.log(req.body);
  res.send(req.body);
});

//query params ke andar data ko kis tarike se send kar sakte hai
app.put("/:update", async (req, res) => {
  let data = await conn();
  let result = await data.updateOne(
    { name: req.params.update },
    { $set: req.body }
  );
  console.log(req.body);
  res.send({ resul: "updated" });
});
//delete(DELETE) data from the database with the help of postman

//target to id
app.delete("/:id", async (req, res) => {
  const data = await conn();
  const result = await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.send(result);
  console.log(result);
});

//target to age
app.delete("/:age", async (req, res) => {
  let data = await conn();
  let result = await data.deleteOne(
    { age: req.params.age },
    { $set: req.body }
  );
  res.send(result);
  console.log(result);
});

app.listen(4000);
