// saves action handler
function attachListeners() {
  document.getElementById('save').addEventListener('click', function() {
    var projectId = document.getElementById('projects').value;
    
    chrome.storage.sync.set({"project_id": projectId});
    window.close();
  });
}

// starts flow
document.addEventListener('DOMContentLoaded', function() {
  attachListeners();
  authorizeAndFetchProjects();
});

// authorizes extension in Todist and fetch projects
// followed by showing it
function authorizeAndFetchProjects() {
  var todoistOauth = new OAuth2('todoist', {
    'client_id': "21b13def0a134167bfd1695ad87c134f",
    "client_secret": "d5cf8b4ea94c46f18d25e7bf1e80b901",
    "state": "asdf",
    "api_scope": "data:read"
  });
  
  todoistOauth.authorize(function() {
    fetchProjects(todoistOauth.getAccessToken());
  });
}

// fetches projects using granted access token
function fetchProjects(accessToken) {
  // 2. exchange code for accessToken
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(event) {
    if (xhr.readyState == 4) {
      if(xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        showProjects(response);
      }
    }
  };
  
  var message = "token=" + accessToken
    + "&seq_no=0"
    + "&resource_types=[\"projects\"]";
  
  xhr.open('POST', 'https://todoist.com/API/v6/sync', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
}

// shows project list
function showProjects(response) {
  var projects = response.Projects;
  
  var projectsSelect = document.getElementById('projects');
  for(var i = 0; i < projects.length; i++) {
    var option = document.createElement('option');
    option.text = projects[i].name;
    option.value = projects[i].id;
    projectsSelect.add(option, null);
  }
  
  selectPreviouslyChosenProject();
}

function selectPreviouslyChosenProject() {
  var projectsSelect = document.getElementById('projects');
  
  chrome.storage.sync.get("project_id", function(saved) {
    projectsSelect.value = saved.project_id;
  });
}