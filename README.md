# WiFi SSID and Password Extractor
This program uses the `child_process` module in Node.js to run the `netsh` command on a Windows machine and extract the names and passwords of the WiFi profiles stored on the machine.

## Prerequisites
* Node.js
* Windows operating system
## Installation
1. Clone or download the repository
2. Open a terminal and navigate to the project directory
3. Run `npm install` to install the dependencies
## Usage
1. Run the program using `node index.js`
2. The program will execute the `netsh wlan show profile` command to get a list of all the WiFi profiles stored on the machine
3. It will then run the `netsh wlan show profile name="${ssid}" key=clear` command for each SSID to get the password in clear text
4. The program will save the SSIDs and passwords in an object and log the object to the console
## Output
The program will output an object with the SSIDs as keys and the passwords as values. For example:

```
{
  "MyWiFiNetwork1": "password123",
  "MyWiFiNetwork2": "qwerty456",
  ...
}
```
## Note
This program is intended for educational purposes only. It is not recommended to use it to obtain the passwords of WiFi networks without the owner's permission.
