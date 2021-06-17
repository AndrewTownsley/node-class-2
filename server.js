const http = require("http");
// Creates a server object
const port = 3000;

http.createServer(requestHandler).listen(port, initialMessage);

function initialMessage() {
  console.log("server listening on port:" + port);
}

function buildHTMLResponse(title) {
  return (`<h1 style='font-size: 100px'>${title}</h1>`);
}

function requestHandler(request, response){
  const { url, method } = request;
  const chunks = [];

  request.on("error", (error) => {
    response.writeHead(400, { "Content-Type": "text/html"});
    response.write("<h1>bad request</h1>")
    request.end();
  })
  request.on("error", (error) => {
    response.writeHead(500, { "Content-Type": "text/html"});
    response.write("<h1> server error bad request</h1>")
    request.end();
  })

  request.on("data", (chunk) => {
    chunks.push(chunk);
  }).on("end", () => {
    let data = JSON.parse(Buffer.concat(chunks).toString());
    console.log(data);
  }) // element.addEventListener("click", function(){})

  let message = buildHTMLResponse("404");
  let status = 404;
  if(url == "/") {
    title = buildHTMLResponse("Home");
    status = 200;
  } else if(url == "/about") {
    title = buildHTMLResponse("About");
    status = 200;
  } else if(url == "/contact") {
    if(method == "POST") {
      fileName = "thankYou"
    } else {
      fileName="contact";
    }
    status = 200;
  }

  fs.readFile(`./${fileName}.html` , function sendContents(err, data) {
    if(err) {
      request.emit("error", err)
      return
      console.log(err);
    }
    response.statusCode = status;
    response.setHeader("Content-Type", "text/html");
    console.log(data);
    response.write(data);
    response.end();
  })
}