// saves action handler
function attachListeners() {
  document.getElementById('save').addEventListener('click', function() {
    var projectIds = document.getElementsByName('projectSelect');
    var array = [];
    for(var i = 0; i < projectIds.length; i++) {
      if(projectIds[i].value !== "")
        array.push(projectIds[i].value);
    }
    
    chrome.storage.sync.set({"project_ids": array});
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
        showAllProjects(response);
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

function showAllProjects(response) {
  chrome.storage.sync.get("project_ids", function(savedProjects) {
    for(var i = 0; i < savedProjects["project_ids"].length; i++) {
      showProjects(response, savedProjects["project_ids"][i]);
    }
    showProjects(response);
  });
}

// shows project list
function showProjects(response, projectId) {
  var projects = response.Projects;
  
  var projectSelect = document.createElement('select');
  projectSelect.name = "projectSelect";
  projectSelect.style = "width: 200px; margin: 3px";
  var emptyOption = document.createElement('option');
  projectSelect.add(emptyOption, null);
  for(var i = 0; i < projects.length; i++) {
    var option = document.createElement('option');
    option.text = projects[i].name;
    option.value = projects[i].id;
    projectSelect.add(option, null);
  }


  document.getElementById('projects').appendChild(projectSelect);
  selectPreviouslyChosenProject(projectSelect, projectId);
}

function selectPreviouslyChosenProject(projectSelect, projectId) {
  if(typeof(projectId) !== "undefined") {
    projectSelect.value = projectId;
  }
}