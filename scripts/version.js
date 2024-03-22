console.log("BemisEditor/script/version.js:LOADED");
(async () => {
    try {
      // Fetch expected version from local manifest.json (assuming it's in the root directory)
      const response = await fetch('manifest.json');
      const localManifest = await response.json();
      const expectedVersion = localManifest.version;
  
      // Fetch version from remote GitHub manifest
      const remoteResponse = await fetch('https://raw.githubusercontent.com/keegang6705/BemisEditor/master/manifest.json');
      const remoteManifest = await remoteResponse.json();
  
      if (remoteManifest.version !== expectedVersion) {
        alert('BemisEditor version mismatch! Expected:', expectedVersion, 'Found:', remoteManifest.version);
      } else {
        alert('BemisEditor version matches expected version:', expectedVersion);
      }
    } catch (error) {
      alert('Error fetching versions:', error);
    }
  })();
  