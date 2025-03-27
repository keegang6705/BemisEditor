console.log("BemisEditor/scripts/background.js:LOADED");

const url_list = [
  { path: "", parameter: [] , script:""},
  { path: "studentprocess/scorerecord", parameter: [], script:"/scripts/table_editorX.js" },
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  if (changeInfo.status === "loading" && tab.url.startsWith("https://bemisschool.bangkok.go.th")) {
    let foundMatch = false;
    for (let i = 0; i < url_list.length; i++) {
      const current_url = url_list[i].path;
      const current_parameter = url_list[i].parameter;
      const current_script = url_list[i].script;
      
      if (tab.url.startsWith(`https://bemisschool.bangkok.go.th/${current_url}`)) {
        foundMatch = true;
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: [current_script],
          });
        if (tab.url.includes("bme=true") || tab.url.includes("bme=false")) {
          break;
        } else {
          chrome.tabs.sendMessage(tabId, { action: "updateUrl", includeParameter: true,parameter: current_parameter,bmeState:true });
        }
        break;
      }
    }
    
    if (!foundMatch) {
      if (!tab.url.includes("bme=")) {
        chrome.tabs.sendMessage(tabId, { action: "updateUrl" , includeParameter: false ,bmeState:false});
      }
    }
  }
});
