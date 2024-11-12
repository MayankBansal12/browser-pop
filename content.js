const currentDomain=window.location.hostname.replace("www.","")

chrome.storage.sync.get({blockedUrls: []},(data)=>{
    const blockedUrls=data.blockedUrls
    if(!blockedUrls || blockedUrls.length<=0){
        return;
    }
    blockedUrls.forEach(entry=>{
        if(entry.url === currentDomain && entry.open === true){
            window.location.href = chrome.runtime.getURL("blocked.html?url="+ currentDomain);        
        }
    })
})