console.log('BemisEditor/scripts/scorecord.js:LOADED');
var expand_table = false;
chrome.storage.sync.get(null, function(result) {
    if (chrome.runtime.lastError) {
      console.log('BemisEditor/scripts/scorecord.js:', chrome.runtime.lastError);
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
    console.log('BemisEditor/scripts/scorecord.js:EXPAND_TABLE_SUCCESS');
    } catch (error) {
        console.log("BemisEditor/scripts/scorecord.js:EXPAND_TABLE_FAILED");
    }
}
function addOption() {
    try {
        let option = document.createElement("option");
        option.value = "99999";
        option.innerHTML = "99999";

        let targetElement = document.querySelector('[aria-label="จำนวนรายการต่อหน้า"]');
        if (!targetElement) throw new Error("Target element not found");

        targetElement.appendChild(option);
        console.log("BemisEditor/scripts/scorecord.js:ADD_OPTION_SUCCESS");
    } catch (error) {
        console.log("BemisEditor/scripts/scorecord.js:"+ error);
    }
}

const targetNode = document.body;
const observerOptions = { childList: true, subtree: true };

const observer = new MutationObserver(() => {
    if (!document.querySelector(".sc-fqkvVR")) {
        console.log("Element .sc-fqkvVR has disappeared!");
        setTimeout(() => {
            expand_table? expandTable(): null;
            addOption();
        }, 500);
        observer.disconnect();

    }
});

observer.observe(targetNode, observerOptions);

