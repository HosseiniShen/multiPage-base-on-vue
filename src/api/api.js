import Qs from 'qs'
import axios from 'axios'
import requestMap from './config'

let [baseOrigin, origin] = ['', `${window.location.protocol}//${window.location.host}`];
let match = origin.match(/^(http:\/\/(127.0.0.1|192.168.1.|localhost))\d*:\d{2,4}/i);
baseOrigin = match && match[1];
baseOrigin = baseOrigin || origin;
let requestItem = baseOrigin && requestMap[baseOrigin];
baseOrigin = !!requestItem ? requestItem.requestUrl : '';


let xhrHeaders = {'Content-Type':'application/json; charset=utf-8'};
if (requestItem) {
    xhrHeaders.AppId = requestItem.appId;
    xhrHeaders.AppSecret = requestItem.appSecret;
}

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    let accessToken = window.sessionStorage.getItem('accessToken') || window.localStorage.getItem('accessToken');
    if (accessToken) {
        config['headers']['x-auth-token'] = accessToken;
    }

    if (config.loading) {
        //TODO startLoading
    }
    return config;
}, (error) => {
    //请求错误处理
    //TODO stopLoading
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use((response) => {
    //TODO stopLoading
    return response;
}, (error) => {
    //响应错误处理
    //TODO stopLoading
    error = error && error.response;
    if (!error) {
        return false;
    }
    //400 Bad Request
    if (error.status == '400') {
        return Promise.reject(error);
    }

    //401 Unauthorized
    if (error.status == '401') {
        let preAuthUrl = window.location.href;
        //TODO 未授权跳转到登录
    }
});

export default {
    method: 'GET',

    baseURL: baseOrigin + '/ymmopenapi/sgw/v1',

    url: '',

    //允许在请求数据之前修改请求数据
    //仅限put/post/patch
    //函数返回必须是一个string或ArrayBuffer或Stream
    transformRequest: [data => data],

    transformResponse: [data => data],

    headers: xhrHeaders,

    params: {},

    paramsSerializer: (params) => Qs.stringify(params),

    data: {},

    timeout: 60000,

    //标识跨域请求时是否需要使用凭证
    withCredentials: false,

    responseType: 'json',

    onUploadProgress: function (progressEvent) {
	},

    //download时执行的操作
	onDownloadProgress: function (progressEvent) {
	},

    //定义了接收到的response响应数据的最大长度。
	maxContentLength: 2000,

    //default 定义了根据HTTP响应状态码决定是否接收或拒绝获取到的promise。如果 validateStatus 返回 true (或设置为 null 或 undefined ),promise将被接收;否则,promise将被拒绝。 
	validateStatus: function (status) {
	    return status >= 200 && status < 300;
	},

    // default  定义了在Node.js中redirect的最大值，如果设置为0，则没有redirect。 
	maxRedirects: 5, 

    //私有参数
    loading: true
}
