import {request} from './NetworkRequest';

function get(subUrl,params) {
    return request({
        url: subUrl,
        method: 'GET',
        params
    });
}

const APIClient = {
    get
}
export default APIClient;