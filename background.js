function openChosenProject() {
  chrome.storage.sync.get("project_id", function(saved) {
    if(typeof saved.project_id !== "undefined") {
      chrome.tabs.create({
        "url": "https://todoist.com/app#project%2F" + saved.project_id
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