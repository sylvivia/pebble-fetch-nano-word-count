var myAuthHeader = new Headers();
myAuthHeader.append("Authorization", "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDUyNDAzMTgsImlzcyI6Ik5hTm9XcmlNbyIsImF1ZCI6Im5ldzItd2Vic2l0ZS1jbGllbnQiLCJ1c2VyX2lkIjoxMTQ5NTkxLCJwZXBwZXIiOjB9.TCveOR3G2tIdCYgKWFDPYLt7xn4DXjGzpxwR6EawuW8");

var requestOptions = {
  method: 'GET',
  headers: myAuthHeader,
  redirect: 'follow'
};

urlProjectOne = "https://api.nanowrimo.org/projects/1152996";
urlProjectTwo = "https://api.nanowrimo.org/projects/2192897";
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