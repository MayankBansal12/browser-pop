
let blockedUrlsDiv=document.getElementById("blocked-urls")

document.getElementById('addButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    if (url) {
      chrome.storage.sync.get({ blockedUrls: [] }, (data) => {
        const blockedUrls = data.blockedUrls;
        blockedUrls.push(url);
        chrome.storage.sync.set({ blockedUrls });
      });
    }
});

chrome.storage.sync.get({ blockedUrls: [] }, (data) => {
    const blockedUrls = data.blockedUrls;
    if(blockedUrls && blockedUrls.length > 0){
        blockedUrls.forEach(url => {
            let newList=document.createElement("li");
            newList.textContent=url;
            blockedUrlsDiv.appendChild(newList);
        });
    }
});