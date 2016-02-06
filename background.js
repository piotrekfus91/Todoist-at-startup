chrome.storage.sync.get("project_id", function(saved) {
  if(typeof saved.project_id !== "undefined") {
    chrome.tabs.create({
      "url": "https://todoist.com/app#project%2F" + saved.project_id
    });
  }
});