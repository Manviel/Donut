chrome.runtime.onInstalled.addListener(() => {
  console.log("installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.query) {
    fetchVenues(request.query);
  }

  sendResponse();
});
