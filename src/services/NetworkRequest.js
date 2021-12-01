import axios from 'axios';
import {APP} from './Config';

/**
 * Request Wrapper with default success/error actions
 */
export const request = async function (options, isHeader) {
  console.log('REQUETS URL',APP.BASE_URL)
  
  const client = axios.create({
    baseURL: APP.BASE_URL,
    timeout: 5000,
  });
  const onSuccess = function (response) {
    return response.data;
  };
  const onError = function (error) {
    console.debug('Request Failed:', error.config);
    if (error.response) {
      console.debug('Status:', error.response.status);
    } 
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
};