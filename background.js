function openChosenProject() {
  chrome.tabs.query({active: true}, function (tab) {
    if(!tab[0].url.includes("https://todoist.com/")) {
      chrome.storage.sync.get("project_ids", function(saved) {
        if(typeof saved.project_ids !== "undefined") {
          for(var i = 0; i < saved.project_ids.length; i++) {
            var projectId = saved.project_ids[i];
            chrome.tabs.create({
              "url": "https://todoist.com/app#project%2F" + projectId
            });
          }
        }
      });
    }
  });
}

function setupAlarm() {
  var tomorrow = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
  var startTime = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 3, 0, 0, 0);
  chrome.alarms.create('todoistNightStarter', {
    when: startTime.getTime(),
    periodInMinutes: 60 * 24
  });

}

function addAlarmCallback() {
  chrome.alarms.onAlarm.addListener(function(alarm) {
    if(alarm.name == 'todoistNightStarter') {
      openChosenProject();
    }
  });
}

setupAlarm();
addAlarmCallback();
openChosenProject();