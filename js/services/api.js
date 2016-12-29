
import axios from 'axios';

//const baseUrl = "http://ec2-52-4-99-199.compute-1.amazonaws.com:9900/mconfig";
const baseUrl = "http://ec2-52-4-99-199.compute-1.amazonaws.com:9800/featuremanagement";

// TO DO get from logged in user state
const defaultInput = {
		baseEntity: {
			name: "",
			attributes: { APP_LOGGED_IN_PROJECT_ID: 0 },
			childEntities: []
								}
				};

const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'app-key': 'db6003e6-0093-4e3d-a8d0-d4ff26b750c2',
      'mediaType': 'json'
    }
  };

export function baseFormUpdate(ceid,beid,ceprimaryKey,formData){
  
    let payload = JSON.parse(JSON.stringify(defaultInput));
    payload.baseEntity.attributes=formData;
    payload.baseEntity.configId=beid;


    console.log('url:::::::::::::'+ baseUrl+'/rest/'+ceid+'/'+ceprimaryKey);
    console.log('payload:::::::::::::'+JSON.stringify(payload));
    console.log('config:::::::::::::'+JSON.stringify(config));
    return axios.patch(
      baseUrl+'/rest/'+ceid+'/'+ceprimaryKey,payload,config
    );
}

export function getConfig(configId) {
  return axios.get(baseUrl + '/rest/md/' + configId, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'app-key': 'db6003e6-0093-4e3d-a8d0-d4ff26b750c2',
      'mediaType': 'json'
    }
  });
}

export function getEditFormData(ceid,leid,key) {
  return axios.get(baseUrl + '/rest/'+ceid+'/'+leid+'/'+key,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'app-key': 'db6003e6-0093-4e3d-a8d0-d4ff26b750c2',
      'mediaType': 'json' 
    }
  });
}

export function getGridData(nodeId) {
  return axios.post(baseUrl + '/rest/gridData/' + nodeId, defaultInput, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'app-key': 'db6003e6-0093-4e3d-a8d0-d4ff26b750c2',
      'mediaType': 'json'
    }
  });

}