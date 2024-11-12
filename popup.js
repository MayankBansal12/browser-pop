let blockedUrlsDiv=document.getElementById("blocked-urls")
let messageDiv=document.getElementById("message")
let inputDiv=document.getElementById("urlInput")

document.getElementById("addButton").addEventListener("click", () => {
  const url = inputDiv.value.trim().replace(/^https?:\/\//, "").replace(/^www\./, "");  
    if (url) {
      chrome.storage.sync.get({ blockedUrls: [] }, (data) => {
        const updatedBlockedSites=[...data.blockedUrls, {
          url, 
          "id": generateId(data.blockedUrls),
          "open": true
        }]
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

function generateId(blockedUrls){
  if(!blockedUrls){
    return 1;
  }
  return blockedUrls.length + 1;
}

function removeLink(entry,blockedUrls){
  const updatedBlockedUrls=blockedUrls.filter(e=>e.id!==entry.id)
  chrome.storage.sync.set({blockedUrls: updatedBlockedUrls}, ()=>{});
}

function setActive(entry,blockedUrls){
  const idx=blockedUrls.findIndex(e=>e.id===entry.id)
  if(idx<0){
    console.error("can't set the status to on")
    return;
  }
  blockedUrls[idx].open=true;
  chrome.storage.sync.set({blockedUrls}, ()=>{});
}

function setInActive(entry,blockedUrls){
  const idx=blockedUrls.findIndex(e=>e.id===entry.id)
  if(idx<0){
    console.error("can't set the status to on")
    return;
  }
  blockedUrls[idx].open=false;
  chrome.storage.sync.set({blockedUrls}, ()=>{});
}

function displayBlockedSites(){
  const onTag=`<?xml version="1.0" encoding="UTF-8"?><svg width="25px" height="25px" stroke-width="1.5" viewBox="0 0 24 24" fill="rgba(115, 175, 117, 0.6)" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M1 15V9C1 5.68629 3.68629 3 7 3H17C20.3137 3 23 5.68629 23 9V15C23 18.3137 20.3137 21 17 21H7C3.68629 21 1 18.3137 1 15Z" stroke="#000000" stroke-width="1.5"></path><path d="M9 9C10.6569 9 12 10.3431 12 12C12 13.6569 10.6569 15 9 15C7.34315 15 6 13.6569 6 12C6 10.3431 7.34315 9 9 9Z" stroke="#000000" stroke-width="1.5"></path><path d="M14 15V9L18 15V9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
  const offTag=`<?xml version="1.0" encoding="UTF-8"?><svg width="25px" height="25px" stroke-width="1.5" viewBox="0 0 24 24" fill="rgba(233, 64, 52, 0.5)" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M1 15V9C1 5.68629 3.68629 3 7 3H17C20.3137 3 23 5.68629 23 9V15C23 18.3137 20.3137 21 17 21H7C3.68629 21 1 18.3137 1 15Z" stroke="#000000" stroke-width="1.5"></path><path d="M7 9C8.65685 9 10 10.3431 10 12C10 13.6569 8.65685 15 7 15C5.34315 15 4 13.6569 4 12C4 10.3431 5.34315 9 7 9Z" stroke="#000000" stroke-width="1.5"></path><path d="M12 15V9L15 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 15V9L20 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.0001 12H14.5715" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.0001 12H19.5715" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
  const removeIcon=`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48"><path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.796625 6 11.086453 6.9162188 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.913547 6.9162187 35.202375 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 8.9726562 18 L 11.125 38.085938 C 11.425 40.887937 13.77575 43 16.59375 43 L 31.40625 43 C 34.22325 43 36.574 40.887938 36.875 38.085938 L 39.027344 18 L 8.9726562 18 z"></path></svg>`;

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
    blockedUrls.forEach(entry => {
        let newList=document.createElement("li");
        let url=document.createElement("span");
        url.textContent=entry.url;

        let statusBtn=document.createElement("p");
        let onBtn=document.createElement("button");
        onBtn.innerHTML=onTag;
        onBtn.addEventListener("click", ()=>setActive(entry,blockedUrls))
        
        let offBtn=document.createElement("button");
        offBtn.innerHTML=offTag;
        offBtn.addEventListener("click", ()=>setInActive(entry, blockedUrls))

        entry.open=== true ? offBtn.classList.add("dim-opacity") : onBtn.classList.add("dim-opacity")

        statusBtn.appendChild(onBtn);
        statusBtn.appendChild(offBtn);

        let removeBtn=document.createElement("button");
        removeBtn.addEventListener("click", ()=>removeLink(entry,blockedUrls));
        removeBtn.innerHTML= removeIcon;
        newList.appendChild(url);
        newList.appendChild(statusBtn);
        newList.appendChild(removeBtn);
        blockedUrlsDiv.appendChild(newList);
    });
  });
}

displayBlockedSites()