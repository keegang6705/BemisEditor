console.log("BemisEditor/popup/popup.js:LOADED");
const open_editor_btn = document.getElementById("btn-open-editor");
const send_email_btn = document.getElementById("btn-send-email");
const donate_btn = document.getElementById("btn-donate");
var input_text = document.getElementById("textarea-input");
const settings_btn = document.getElementById("btn-settings");
const settings_container = document.getElementById("settings-container");
var settingCheckboxes = document.querySelectorAll('input[type="checkbox"][id$="-state"]');
const next_class_btn = document.getElementById("btn-next-class");
const last_class_btn = document.getElementById("btn-last-class");

loadSettings();
saveSettings();
function loadSettings() {
  var settingCheckboxes = document.querySelectorAll('input[type="checkbox"][id$="-state"]');


  chrome.storage.sync.get(null, function(result) {
    if (chrome.runtime.lastError) {
      alert('Error loading setting:', settings, chrome.runtime.lastError);
      return;
    }

    var settingValue = result
    if (JSON.stringify(settingValue) === "{}"){
      return;
    }
    for (var i = 0; i < settingCheckboxes.length; i++) {
      var checkbox = settingCheckboxes[i];
      checkbox.checked= settingValue[checkbox.id]
    }
  });
  }


function saveSettings() {
  var settingCheckboxes = document.querySelectorAll('input[type="checkbox"][id$="-state"]');
  var settings = {};
  for (var i = 0; i < settingCheckboxes.length; i++) {
    var checkbox = settingCheckboxes[i];
    settings[checkbox.id] = checkbox.checked;
    
  }

  chrome.storage.sync.set(settings, function() {
    console.log("BemisEditor/popup/popup.js:SETTING SAVED");
  });


}
for (var i = 0; i < settingCheckboxes.length; i++) {
  var checkbox = settingCheckboxes[i];
  checkbox.addEventListener('change', function() {
    console.log("BemisEditor/popup/popup.js:SETTING CHANGED")
    saveSettings();
  });
}

settings_btn.addEventListener("click", function() {
  if (settings_container.style.display === "none") {
    settings_container.style.display = "block";
  } else {
    settings_container.style.display = "none";
  }
});

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
  next_class_btn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        const url = tabs[0].url;
        const urlParams = new URLSearchParams(url.split('?')[1]);
        let schoolClassroomCode = parseInt(urlParams.get('school_classroom_code'));
        schoolClassroomCode++;
        urlParams.set('school_classroom_code', schoolClassroomCode.toString());
        const newUrl = url.split('?')[0] + '?' + urlParams.toString();
        chrome.tabs.update(undefined, { url: newUrl });
      });
  });
  last_class_btn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        const url = tabs[0].url;
        const urlParams = new URLSearchParams(url.split('?')[1]);
        let schoolClassroomCode = parseInt(urlParams.get('school_classroom_code'));
        schoolClassroomCode--;
        urlParams.set('school_classroom_code', schoolClassroomCode.toString());
        const newUrl = url.split('?')[0] + '?' + urlParams.toString();
        chrome.tabs.update(undefined, { url: newUrl });
      });
  });

