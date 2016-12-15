
import axios from 'axios';

const baseUrl = "http://ec2-52-4-99-199.compute-1.amazonaws.com:9900/mconfig";


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