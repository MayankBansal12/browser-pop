const currentDomain=window.location.hostname.replace("www.","")

console.log("domain: ", currentDomain)

chrome.storage.sync.get({blockedUrls: []},(data)=>{
    const blockedUrls=data.blockedUrls
    if(!blockedUrls || blockedUrls.length<=0){
        return;
    }
    if(blockedUrls.includes(currentDomain)){
        window.location.href = chrome.runtime.getURL("blocked.html");
    }
})