
# Encrypted

## Run the rest api

## Python setup

pip install requests
pip install openai
pip install flask
pip install flask_cors

## Run the rest api

export OPENAI_API_KEY=" your key here "
python3 api.py

## Run UI

1. cd src\client-app\my-app
2. npm install 
3. npm start

## Call the API

From Local: curl <http://0.0.0.0/5000>
Azure hosted URL:
Dev: curl 48.211.219.114:5000
PROD: curl 172.210.234.90:5000

## Deployment

ssh devtest@48.211.219.114
PW: DevTest123!.

start-python-api.sh
start-react-client.sh

## Open AI

<https://platform.openai.com/api-keys>

## REST end points for UI

curl 172.210.234.90:5000

## Level 1 REST end points

<http://127.0.0.1:5000/api/level1/password>

```json
{
    "password": "password"
}
```

## Level 2 REST end points

curl <http://127.0.0.1:5000/api/level2/sos>

## Level 3 REST end points

## Level 4 REST end points

## Common end points

curl <http://127.0.0.1:5000/api/1/help>

curl <http://127.0.0.1:5000/api/1/chat_bot>
{"query":"query","parameters": {"param1":"value1"}}
Download bruno
<https://www.usebruno.com/>

Import collections from [EncryptEd.json](rest-api-collections%2FEncryptEd.json)
