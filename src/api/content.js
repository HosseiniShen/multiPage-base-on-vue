import axios from 'axios'
import config from './api'

//获取知识标签
export const getKnowledgeTag =(params)=>{
    config.method = "GET";
    config.params = params;
    config.url = '/content/knowledge/classification';
    return axios(config).then(res => res && res.data);
}

//获取知识内容列表
export const getKnowledgeList =(params)=>{
    config.method = "GET";
    config.params = params;
    config.url = '/content/knowledge';
    return axios(config).then(res => res && res.data);
}

// 获取知识关键字
export const getKeywords =(params)=>{
    config.method = "GET";
    config.params = params;
    config.url = '/content/knowledge/keyword';
    return axios(config).then(res => res && res.data);
}

//获取知识内容明细
export const getKnowledgeDetails =(params)=>{
    config.method = "GET";
    config.params = params;
    config.url = '/content/knowledge/detail/';
    return axios(config).then(res => res && res.data);
}

//获取知识关键字列表
export const getKeywordList =(params)=>{
    config.method = "GET";
    config.params = params;
    config.url = '/content/knowledge/_search';
    return axios(config).then(res => res && res.data);
}
