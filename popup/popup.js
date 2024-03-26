console.log("BemisEditor/popup/popup.js:LOADED");
const open_editor_btn = document.getElementById("btn-open-editor");
const send_email_btn = document.getElementById("btn-send-email");
const donate_btn = document.getElementById("btn-donate");
var input_text = document.getElementById("textarea-input");
function stringTo2DArray(t) {
  try {
    var e = t.trim().split("\n"),
      i = [];
    return (
      e.forEach(function (t) {
        var e = t.split("	");
        i.push(e);
      }),
      i
    );
  } catch {
    alert("รูปแบบข้อมูลไม่ถูกต้อง");
  }
}
input_text.addEventListener("keydown", function (t) {
  if (9 === t.keyCode) {
    t.preventDefault();
    var e = this.selectionStart,
      i = this.value.substring(0, e),
      n = this.value.substring(e);
    (this.value = i + "	" + n),
      (this.selectionStart = this.selectionEnd = e + 1);
  }
}),
  open_editor_btn.addEventListener("click", function () {
    (input_text = document.getElementById("textarea-input")),
      chrome.storage.local.set(
        { score_array: stringTo2DArray(input_text.value) },
        function () {}
      ),
      chrome.tabs.query({ active: !0, currentWindow: !0 }, (t) => {
        chrome.scripting
          .executeScript({
            target: { tabId: t[0].id },
            files: ["scripts/table_editor.js"],
          })
          .then(() => console.log("script injected"));
      });
  });
  send_email_btn.addEventListener("click", function () {
        chrome.tabs.create({
           url: 'https://mail.google.com/mail/u/0/?fs=1&to=darunphobwi@gmail.com&su=BemisEditor-BugReport&body=อธิบายปัญหาของคุณ:&tf=cm' 
          });
  });
  donate_btn.addEventListener("click", function () {
    chrome.tabs.create({
       url: 'https://keegang.000.pe/menu/donate' 
      });
});
