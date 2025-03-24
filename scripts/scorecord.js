console.log('scorecord.js:LOADED');
var expand_table = false;
chrome.storage.sync.get(null, function(result) {
    if (chrome.runtime.lastError) {
      alert('Error loading setting:', chrome.runtime.lastError);
      return;
    }

    var settingValue = result
    if (JSON.stringify(settingValue) === "{}"){
      return;
    }
    expand_table = settingValue["setting2-state"];
    ;
  });
function expandTable(){
    try {
    let e = document.querySelector('div[style*="max-height: 400px"]');
    e.style.maxHeight = "100%";
    console.log('scorecord.js:EXPAND_TABLE_SUCCESS');
    clearInterval(retryInterval);
    clearInterval(retryInterval2);
    } catch (error) {
        console.warn("scorecord.js:EXPAND_TABLE_FAILED_RETRY");
    }
}
function addOption() {
    try {
        let option = document.createElement("option");
        option.value = "99999";
        option.innerHTML = "BemisEditor.value.99999";

        let targetElement = document.querySelector(".sc-iHGNWf");
        if (!targetElement) throw new Error("Target element not found");

        targetElement.appendChild(option);
        console.log("scorecord.js:ADD_OPTION_SUCCESS");
        clearInterval(retryInterval);
        clearInterval(retryInterval2);
    } catch (error) {
        console.warn("scorecord.js:ADD_OPTION_FAILED_RETRY");
    }
}

let retryInterval = expand_table? setInterval(addOption, 1000): null;
let retryInterval2 = setInterval(expandTable, 1000);
setTimeout(() => {
    clearInterval(retryInterval);
    clearInterval(retryInterval2);
    console.error("scorecord.js:FAILED_MAX_RETRY");
}, 30000);