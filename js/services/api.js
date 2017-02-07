
import axios from 'axios';
import update from 'immutability-helper';

const baseUrl = "http://ec2-52-4-99-199.compute-1.amazonaws.com:9900/demoedi";
//const baseUrl = "http://ec2-52-4-99-199.compute-1.amazonaws.com:8888/companymanagement";

// TO DO get from logged in user state

function defaultInput() {
  return {
  baseEntity: {
    name: "",
    attributes: {
      APP_LOGGED_IN_PROJECT_ID: 0,
      APP_LOGGED_IN_ROLE_ID: 16,
      APP_LOGGED_IN_USER_ID: 1111
    },
    childEntities: []
  }
};
}

function getHeaders(key) {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'app-key': key,
      'mediaType': 'json'
    }
  };
}


export function baseFormUpdate(ceid, beid, ceprimaryKey, formData) {
  let payload = JSON.parse(JSON.stringify(defaultInput()));
  payload.baseEntity.attributes = formData;
  payload.baseEntity.configId = beid;
  return axios.patch(
    baseUrl + '/rest/' + ceid + '/' + ceprimaryKey, payload, getHeaders('db6003e6-0093-4e3d-a8d0-d4ff26b750c2')
  );
}

export function getConfig(configId) {
  return axios.get(baseUrl + '/rest/md/' + configId, getHeaders('db6003e6-0093-4e3d-a8d0-d4ff26b750c2'));
}


export function submitNodeData(ceid, keys, apiRequest) {
  return axios.patch(
    baseUrl + '/rest/' + ceid + '/' + keys.primaryKey, apiRequest, getHeaders('db6003e6-0093-4e3d-a8d0-d4ff26b750c2')
  );
}

export function getCENodeData(ceid, leid, key) {
  return axios.get(baseUrl + '/rest/' + ceid + '/' + leid + '/' + key, getHeaders('db6003e6-0093-4e3d-a8d0-d4ff26b750c2'));
}

export function getSequence(ceid, leid){
  return axios.get(baseUrl + '/rest/seq/' + ceid + '/' + leid , getHeaders('db6003e6-0093-4e3d-a8d0-d4ff26b750c2'));
}

export function getGridData(nodeId, keys) {
  console.log(" getGridData :",keys);
  // merge keys to attributes
  let inputData = keys ? update(defaultInput(), {baseEntity: {attributes :{$merge : keys}}}) : defaultInput();
  return axios.post(baseUrl + '/rest/gridData/' + nodeId, inputData, getHeaders('db6003e6-0093-4e3d-a8d0-d4ff26b750c2'));

}

export function getSelectOptions(configId, nodedata) {
  return axios.post(baseUrl + '/rest/md/options/' + configId, nodedata, getHeaders('db6003e6-0093-4e3d-a8d0-d4ff26b750c2'));
}