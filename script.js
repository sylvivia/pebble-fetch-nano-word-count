const fetch = require('node-fetch');
var http = require('http');
var server = http.createServer ( function(request,response){

response.writeHead(200,{"Content-Type":"application/json"});
if(request.method == "GET")
    {
        response.end("received GET request.")
    }
else if(request.method == "POST")
    {
      main().then(res => response.end(JSON.stringify(res)))
      .catch(error => console.log('error: ', error));
    }
else
    {
        response.end("Undefined request .");
    }
});

server.listen(process.env.PORT);
console.log("Server running on port " + process.env.PORT);

async function main() {
  var requestOptions = {
    method: 'GET',
    headers: {
      Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjkxODQxNjYsImlzcyI6Ik5hTm9XcmlNbyIsImF1ZCI6Im5ldzItd2Vic2l0ZS1jbGllbnQiLCJ1c2VyX2lkIjoxMTQ5NTkxLCJwZXBwZXIiOjB9.bCoG9rsjRQsytRk5rhLQDSnyZTGo15bqvFNWCcv4kac"
    },
    redirect: 'follow'
  };

  urlProjectOne = "https://api.nanowrimo.org/projects/2660095";
  urlProjectTwo = "https://api.nanowrimo.org/projects/2692672";
  project1 = "";
  project2 = "";

  await fetch(urlProjectOne, requestOptions)
    .then(response => response.json())
    .then(result => {
      project1 = result["data"]["attributes"]["unit-count"];
    })
    .catch(error => console.log('error: ', error));

  await new Promise(r => setTimeout(r, 700));

  await fetch(urlProjectTwo, requestOptions)
    .then(response => response.json())
    .then(result => {
      project2 = result["data"]["attributes"]["unit-count"];
    })
    .catch(error => console.log('error: ', error));

  var returnString = project1 + " / " + project2;

  return {
    status: "ok",
    info: returnString,
  }
}