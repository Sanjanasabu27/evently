const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://eventlyadmin:Event12345@ac-2zpjco1-shard-00-00.aykqqs9.mongodb.net:27017,ac-2zpjco1-shard-00-01.aykqqs9.mongodb.net:27017,ac-2zpjco1-shard-00-02.aykqqs9.mongodb.net:27017/eventdb?ssl=true&replicaSet=atlas-2ytcg7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });