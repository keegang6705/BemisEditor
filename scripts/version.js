console.log("BemisEditor/script/version.js:LOADED");
async function check(){
    try {
      const response = await fetch('/manifest.json');
      const localManifest = await response.json();
      const LocalVersion = parseInt((localManifest.version)[0]);

      const remoteResponse = await fetch('https://raw.githubusercontent.com/keegang6705/BemisEditor/master/manifest.json');
      const remoteManifest = await remoteResponse.json();
      const remoteVersion = parseInt((remoteManifest.version)[0]);
      if (remoteVersion > LocalVersion) {
      } else {     
      }
      console.log("BemisEditor/script/version.js:Local"+localManifest.version+",Remote"+remoteManifest.version)
    } catch (error) {
        alert('Error fetching versions \nplease check your internet connection\n'+ error);
      }
  }
check();