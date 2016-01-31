document.addEventListener('DOMContentLoaded', function() {
  var opener = document.getElementById('opener');
  
  opener.addEventListener('click', function() {
    chrome.tabs.create({
      "url": "https://todoist.com/app"
    });
  });
});