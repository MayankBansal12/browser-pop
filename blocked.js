
document.getElementById("access-site-btn").addEventListener("click", () => {
    const domain=window.location.href.split("?url=")
    const urlToRedirect=domain[1];
    const blockedUrl=domain.length > 1 ? "https://" +  urlToRedirect : "";

    chrome.storage.sync.get({blockedUrls: []},(data)=>{
        const blockedUrls=data.blockedUrls
        if(blockedUrls){
            blockedUrls.forEach(entry=>{
                if (entry.url === urlToRedirect){
                    entry.open=false;
                    chrome.storage.sync.set({blockedUrls}, ()=>{})
                }
            })
        }
    })
 
    window.location.href=blockedUrl;
})