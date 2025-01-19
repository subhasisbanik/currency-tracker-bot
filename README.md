# currency-tracker-bot
This project is designed to self host Currency Pairs and show messages for a target rate set. 
The messages generated for a pair of currency rate will be displayed in a Telegram Bot as configured.

This project uses Telegram's node-telegram-bot-api for pushing the messages and axios node modules for integrating with alerts from TransferWise.

## Pre-requisites
1. This project assumes that a general Wise account is created with Transfer Wise and the API token is generated from the developer section thereby.
2. A Telegram Bot is created with the steps mentioned in [Telegram Bots](https://core.telegram.org/bots) and assumes a bot token is available while running.
3. The start command in package.json needs to be configured with the API Token from Wise and Bot token from Telegram before startup

## Hosting
Hosting can be done as a simple Node.Js application on any preferred Cloud Vendor or In Premise as required. This ensures the simplicity of this project.
To ensure to run this as a service in Debian based systems, run the below commands:

```
sudo chmod +x startup.sh
```
Now copy the contents of currency-tracker-startup.service from this path to /etc/systemd/system/ and run the below:
```
sudo nano /etc/systemd/system/currency-tracker-startup.service
```
Now run the below commands:
```
sudo systemctl daemon-reload
sudo systemctl enable currency-tracker-startup.service
sudo systemctl start currency-tracker-startup.service
```

To check the status, run the below command:

```
sudo systemctl status currency-tracker-startup.service
```

## Current status
1. This project is running a nohup thread in an Raspi 
2. Can support multiple users connecting to the bot


## Roadmap
1. Create Docker image for Deployment
2. Add GitOps for seamless CI CD
3. Allow user to configure multiple pairs of currencies
4. Store the user configuration in persistent storage
5. On-premise hosting


## Note:
If there are issues with node and nom, try setting up with nvm. NVM is good and reliable. More details available on :

For setting nvm systen wide, run the below:

```
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npx" "/usr/local/bin/npx"
```
