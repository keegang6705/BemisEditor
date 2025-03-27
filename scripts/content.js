console.log("BemisEditor/scripts/content.js:LOADED");


window.navigation.addEventListener("navigate", (event) => {
  console.log("BemisEditor/scripts/content.js: DETECT url change");
  setTimeout(() => {
  }, 250);
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateUrl") {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.append("bme", request.bmeState.toString());
    if (request.includeParameter) {
      const params = request.parameter;
      params.forEach((e) => newUrl.searchParams.append(e["name"], e["value"]));
    }
    if (request.bmeState) {
      window.location.href = newUrl.toString();
    } else {
      history.pushState(null, "", newUrl.toString());
    }
    sendResponse({ status: "success" });
  }
});
