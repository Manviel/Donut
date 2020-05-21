chrome.runtime.onInstalled.addListener(() => {
  navigator.geolocation.getCurrentPosition(showPosition);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.query) {
    useVenues(request.query);
  } else {
    useVenues("");
  }

  sendResponse();
});

const useVenues = (query) => {
  chrome.storage.sync.get(["coords"], (sync) => {
    fetchVenues(sync.coords, query);
  });
};

const showPosition = (position) => {
  chrome.storage.sync.set({
    coords: [position.coords.latitude, position.coords.longitude],
  });
};

const formatDate = () => {
  const d = new Date();
  const year = d.getFullYear();

  let month = "" + d.getMonth() + 1;
  let day = "" + d.getDate();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
};

const foursquare = {
  client_id: "HPBPKSWKU1A1PFOT3OJXWHUYRQGAC0P1VFMW44DFXVO532T1",
  client_secret: "ZFUREBXR2PHQHAGKH045CXMXMBVVVZRKIZDP2UBTAHVPOEGF",
  date: formatDate(),
};

const fetchVenues = async (coords, query) => {
  const request = await fetch(
    `https://api.foursquare.com/v2/venues/explore?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=${foursquare.date}&ll=${coords[0]},${coords[1]}&query=${query}`
  );

  const result = await request.json();

  if (request.ok) {
    chrome.runtime.sendMessage({ json: result.response });
  }
};
