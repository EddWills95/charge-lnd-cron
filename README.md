# charge-LND-cron
Node cron runner to watch a file and call the charge-lnd python script

Designed to be used as an app with Umbrel 

## To run locally

Set up a `.env` with:
- `CRON_LOCATION` 
- `LOG_LOCATION`

I've been using a folder that will be used by this app and the `charge-lnd-control` 

Start the app:
```
yarn install
yarn start
```