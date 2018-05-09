import axios from 'axios'
import config from './api'

//get请求
export const getKnowledgeTag =(params)=>{
    config.method = "GET";
    config.params = params;
    config.url = '/content/1';
    return axios(config).then(res => res && res.data);
}

//post
export const register = (data) => {
    config.method = "POST";
    config.params = {};
    config.data = JSON.stringify(data);
    config.url = '/security/2';
    return axios(config).then(res => res && res.data);
}