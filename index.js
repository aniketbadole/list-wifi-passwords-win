/* 
WiFi SSIDs and Passwords Extractor
Author: Aniket Badole
*/

const { exec } = require("child_process");

const SSID = [];
const wifiPasswords = {};

// Run the command "netsh wlan show profile"
exec("netsh wlan show profile", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  // Extract the SSIDs from the command output
  const profiles = stdout.match(/All User Profile\s*:\s*(\S+)/g);
  profiles.forEach((profile) => {
    const ssid = profile.replace(/All User Profile\s*:\s*/, "");
    SSID.push(ssid);
  });

  // Run the command "netsh wlan show profile $ssid key=clear" for each SSID
  // and save the result in the wifiPasswords object
  SSID.forEach((ssid) => {
    exec(
      `netsh wlan show profile name="${ssid}" key=clear`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }

        // Extract the WiFi password from the command output
        const password = stdout.match(/Key Content\s*:\s*(\S+)/);
        if (password) {
          wifiPasswords[ssid] = password[1];
        } else {
          wifiPasswords[ssid] = "";
        }

        // Check if all the commands have completed
        if (Object.keys(wifiPasswords).length === SSID.length) {
          console.log(wifiPasswords);
        }
      }
    );
  });
});
