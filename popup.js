var token = "";

document.addEventListener('DOMContentLoaded', function() {
  var opener = document.getElementById('opener');
  
  opener.addEventListener('click', function() {
    console.log("obtained: " + token);
  });
});

var todoistOauth = new OAuth2('todoist', {
  'client_id': "21b13def0a134167bfd1695ad87c134f",
  "client_secret": "d5cf8b4ea94c46f18d25e7bf1e80b901",
  "state": "asdf",
  "api_scope": "data:read"
});

todoistOauth.authorize(function() {
  token = todoistOauth.getAccessToken();
});