import axios from 'axios';
import AWS from 'aws-sdk';

async function configureAWS() {
    try {
      const response = await axios.get("https://379pj43m47.execute-api.us-west-2.amazonaws.com/default/gvsGetCreds");
      AWS.config.update({
        region: 'us-west-2',
        accessKeyId: response.data.accessKeyId,
        secretAccessKey: response.data.secretAccessKey,
      });
    } catch (err) {
      console.log('error', err);
    }
  }
  
  configureAWS();