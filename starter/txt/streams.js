//Streams helps you to start using data, before it has finished loading;
//helps as to read large amount of data
//we use fs.createReadStream
//it will console.log buffers as data

const fs = require("fs");

const readStream = fs.createReadStream("./starter/blog1.txt", {
  encoding: "utf8",
});
// will pass the chunk into the new blog4 file
const writeStream = fs.createWriteStream("starter/txt/blog4.txt");

readStream.on("data", (chunk) => {
  console.log("--- NEW CHUNK----");
  console.log(chunk);

  // will pass the chunk into the new blog4 file
  writeStream.write("\n New Chunk \n");
  writeStream.write(chunk);
});

//piping performs the same fxn as the top one
// readStream.pipe(writeStream);
