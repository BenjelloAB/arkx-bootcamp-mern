const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// MongoClient.connect(url)
// .then( client =>{
//   console.log(client)
//   client.close()
// }).catch( (err)=>{
//   console.log(err)

// })

//or

// client
//   .connect()
//   .then((c) => {
//     console.log("Connected to db");
//     console.log(c)
//   })
//   .catch((err) => {
//     console.log("Err : ", err);
//   });

async function dbConfig() {
  try {
    await client.connect();
    // console.log(client);
    const db = client.db("mydb");
    const collection = db.collection("users");
    // await collection.deleteMany();
    await collection.insertOne({ name: "ahmed", age: 22 });
    await collection.insertOne({ name: "hamza", age: 19 });
    await collection.insertOne({ name: "meho", age: 29 });
    const docs = collection.find()
    console.log(docs)
    client.close();
  } catch (err) {
    console.log(err);
  }
}

dbConfig();
