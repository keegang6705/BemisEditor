console.log("BemisEditor/script/version.js:LOADED");
async function check(){
    try {
      const response = await fetch('/manifest.json');
      const localManifest = await response.json();
      const LocalVersion = parseInt((localManifest.version)[0]);

      const remoteResponse = await fetch('https://raw.githubusercontent.com/keegang6705/BemisEditor/master/manifest.json');
      const remoteManifest = await remoteResponse.json();
      const remoteVersion = parseInt((remoteManifest.version)[0]);
      if (LocalVersion!==remoteVersion) {
        createOverlay();
      } else {
        if(parseFloat(localManifest.version)<parseFloat(remoteManifest.version)){
          updateButton();
        }
      }
      document.getElementById("container").innerHTML = "เวอร์ชั่นปัจจุบัน:"+localManifest.version+" เวอร์ชั่นล่าสุด:"+remoteManifest.version;
    } catch (error) {
        alert('Error fetching versions \nplease check your internet connection\n'+ error);
      }
  }
check();

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 999;
    `;
    const button = document.createElement('a');
    button.textContent = 'UPDATE';
    button.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-decoration: none;
      color: white;
      font-size: 50px;
      padding: 15px 30px;
      border-radius: 5px;
      user-select: none;
    `;
    button.className="btn-danger"
    button.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://chromewebstore.google.com/detail/bemiseditor/lfegfcllckbmjfmdceabejdbnhofnbpo' }); // Replace with your desired URL
      });
      const text = document.createElement('p');
      text.textContent = "การอัพเดทที่จำเป็น โปรดอัพเดทเป็นเวอร์ชั่นล่าสุด"
      overlay.appendChild(text);
    overlay.appendChild(button);
    document.body.appendChild(overlay);
  }
  
  function updateButton(){
    const container = document.getElementById("container2");
    const button = document.createElement('a');
    button.textContent = 'UPDATE';
    button.style.cssText = `
      text-decoration: none;
      color: white;
      font-size: 16px;
      padding: 5px 100px;
      border-radius: 5px;
      user-select: none;
    `;
    button.className="btn-danger"
    button.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://chromewebstore.google.com/detail/bemiseditor/lfegfcllckbmjfmdceabejdbnhofnbpo' }); // Replace with your desired URL
      });
    container.appendChild(button);
    container.appendChild(document.createElement("p"))
  }