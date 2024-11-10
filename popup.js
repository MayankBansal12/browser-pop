let blockedUrlsDiv=document.getElementById("blocked-urls")
let messageDiv=document.getElementById("message")
let inputDiv=document.getElementById("urlInput")

document.getElementById("addButton").addEventListener("click", () => {
  const url = inputDiv.value.trim().replace(/^https?:\/\//, "").replace(/^www\./, "");  
    if (url) {
      chrome.storage.sync.get({ blockedUrls: [] }, (data) => {
        const updatedBlockedSites=[...data.blockedUrls, url]
        chrome.storage.sync.set({blockedUrls: updatedBlockedSites},()=>{
          messageDiv.textContent="Site is added to blocked list!"
          setTimeout(()=>{
            messageDiv.textContent=""
          },3000)
          inputDiv.value=""
        })
      });
    }
});


function displayBlockedSites(){
  chrome.storage.sync.get({ blockedUrls: [] }, (data) => {
    const blockedUrls = data.blockedUrls;
    let newLine=document.createElement("p");
    if(!blockedUrls || blockedUrls.length===0){
      newLine.textContent="No Blocked Sites to show!"
      blockedUrlsDiv.appendChild(newLine)
      return;
    }
    newLine.textContent="Here are the sites that are blocked:"
    blockedUrlsDiv.appendChild(newLine)
    blockedUrls.forEach(url => {
        let newList=document.createElement("li");
        newList.textContent=url;
        blockedUrlsDiv.appendChild(newList);
    });
  });
}

displayBlockedSites()