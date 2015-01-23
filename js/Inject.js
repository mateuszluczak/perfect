if (document.readyState === 'complete') {
    chrome.runtime.sendMessage({page: "load"});
}

window.addEventListener("load", function load(){
    window.removeEventListener("load", load, false);
    chrome.runtime.sendMessage({page: "load"});
},false);