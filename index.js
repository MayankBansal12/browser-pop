chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      chrome.storage.sync.get({ blockedUrls: [] }, (data) => {
        const isBlocked = data.blockedUrls.some(url => details.url.includes(url));
        if (isBlocked) {
            console.log("site is blocked", blockedUrls)
          chrome.tabs.sendMessage(details.tabId, { action: "showOverlay" });
        }
        console.log("not blocked!")
      });
      return {};
    },
    { urls: [
        'https://*/*'
    ] },
    ["blocking" ]
);