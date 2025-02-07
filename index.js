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

const replaceTemplate = (temp, product) => {
  //means golbal replaces productname
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM}/g, product.from);
  output = output.replace(/{%NUTRIENTS}/g, product.nutrients);
};

//we read the overview page
const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  "utf-8"
);

//we read the card page
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  "utf-8"
);

//we read the product page
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  "utf-8"
);

//convert api from json
const data = fs.readFileSync(`${__dirname}/final/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//creating a server
//Hyper-Text Transfer Protocol
//Localhost is like a domain name on the web
//localhost is what your computer is running  on
const server = http.createServer((req, res) => {
  const pathName = req.url;

  //OVERVIEW page{%IMAGE%}
  if (pathName === "/" || pathName === "/overview") {
    //convert to html
    res.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el));
    res.end(tempOverview);

    //Product Page
  } else if (pathName === "/product") {
    const pathName = req.url;
    res.end("This is the PRODUCT");

    //Api
  } else if (pathName === "/api") {
    //we read the api file and the we convert the data from JSON file
    //we rewrite in html format for arrangement
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  } else {
    //Not found
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

//An api is a service which we can request some data
