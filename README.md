
# Encrypted

##  run the rest api
export OPENAI_API_KEY="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"
python3 api.py

### Call the API
From Local: curl http://0.0.0.0/5000
Azure hosted URL: 
Dev: curl 48.211.219.114:5000
PROD: curl 172.210.234.90:5000

# Deployment
ssh devtest@48.211.219.114
PW: DevTest123!.

start-python-api.sh
start-react-client.sh


# Open AI
https://platform.openai.com/api-keys

# REST end points for UI
curl 172.210.234.90:5000

Download bruno
https://www.usebruno.com/

Import collections from [EncryptEd.json](rest-api-collections%2FEncryptEd.json)