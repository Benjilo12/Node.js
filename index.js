const fs = require("fs");
const http = require("http");
const url = require("url");

///////////////////////////////////////////////////////////
/////FILES
//fs is  file system module
//how to read write control files in node.js
//Synchronous
//Blocking way

// const fs = require("fs");

// const textIn = fs.readFileSync("starter/txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("starter./txt/output.txt", textOut);
// console.log("File written!");

//Non-blocking synchronous way
// fs.readFile("starter./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR! 💥");

//   //reads the content of file 1
//   fs.readFile(`starter./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("starter./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         "starter./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your file has been written 😁");
//         }
//       );
//     });
//   });
// });
// console.log("Will read file!");

//Async non Blocking

//improve version
// const fs = require("fs").promises;

// async function processFiles() {
//   try {
//     // Read start.txt
//     const data1 = await fs.readFile("./starter/txt/start.txt", "utf-8");

//     // Read file dynamically based on data1
//     const data2 = await fs.readFile(`./starter/txt/${data1}.txt`, "utf-8");
//     console.log(data2);

//     // Read append.txt
//     const data3 = await fs.readFile("./starter/txt/append.txt", "utf-8");
//     console.log(data3);

//     // Write to final.txt
//     await fs.writeFile(
//       "./starter/txt/final.txt",
//       `${data2}\n${data3}`,
//       "utf-8"
//     );
//     console.log("Your file has been written 😁");
//   } catch (err) {
//     console.log("ERROR! 💥", err);
//   }
// }

// processFiles();
// console.log("Will read file!");

//New modern
//Async
// Reading the content of the start file with node

// fs.readFile("starter/txt/start.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   //data is the content in the file
//   console.log(data.toString());
// });

// writing files
// fs.writeFile("starter/txt/start.txt", "Hello benji", () => {
//   console.log("file was written");
// });

// make directories or create directories
//creates an asset folder
//if folder does exists then create a new folder else if exist already remove folder
// if (!fs.existsSync("./assets")) {
//   fs.mkdir("./assets", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("folder created");
//   });
// } else {
//   fs.rmdir("./assets", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("folder deleted");
//   });
// }

// // deleting files
// //fs.unlink for deleting files
// //if file exits delete it or dont run code
// if (fs.existsSync("starter/txt/deleteme.txt")) {
//   fs.unlink("starter/txt/deleteme.txt", (err) => {
//     {
//       if (err) {
//         console.log(err);
//       }
//       console.log("file deleted");
//     }
//   });
// }

///////////////////////////////////////////////////////////
/////SERVER
//creating a server
//Hyper-Text Transfer Protocol
//Localhost is like a domain name on the web
//localhost is what your computer is running  on
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "./overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    const pathName = req.url;
    res.end("Hello from the server!");
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>Page not found!</h1>");
  }
});

///listerning to the server request
server.listen(8000, "127.0.0.1", () => {
  console.log("Listerning to request on port 8000");
});

/////////////////////////// Status Codes////////*
//in the browser console network tab
//200 - OK
//301 - Resource moved
//404 - Not found
//500 - internal server error
