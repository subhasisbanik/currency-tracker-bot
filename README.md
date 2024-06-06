# currency-tracker-bot
This project is designed to self host Currency Tracker Pairs and show messages for a target rate set. 
The messages generated for a pair of currency rate will be displayed in a Telegram Bot as configured.

This project uses Telegram's node-telegram-bot-api for pushing the messages and axios node modules for integrating with alerts from TransferWise.

## Pre-requisites
1. This project assumes that a general Wise account is created with Transfer Wise and the API token is generated from the developer section thereby.
2. A Telegram Bot is created with the steps mentioned in [text](https://core.telegram.org/bots) and assumes a bot token is available while running.
3. The start command in package.json needs to be configured with the API Token from Wise and Bot token from Telegram before startup

## Hosting
Hosting can be done as a simple Node.Js application on any preferred Cloud Vendor or In Premise as required. This ensures the simplicity of this project.

## Current status
1. This project is running a tmux thread in a Linux machine
2. Can support multiple users connecting to the bot


## Roadmap
1. Create Docker image for Deployment
2. Add GitOps for seamless CI CD
3. Allow user to configure multiple pairs of currencies
4. Store the user configuration in persistent storage
5. On-premise hosting
